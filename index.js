const slackEventsApi = require('@slack/events-api')
const { createMessageAdapter } = require('@slack/interactive-messages')
const SlackClient = require('@slack/client').WebClient
const express = require('express')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()
const rp = require('request-promise')
const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  databaseURL: process.env.FIREBASE_DATABASE
})
const firestore = admin.firestore()

const app = express()
const slackEvents = slackEventsApi.createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET)
const blueprints = require('./blueprints')
const helpers = require('./helpers')

// app.use('/slack/onEvent', slackEvents.expressMiddleware())
app.use('/slack/onAction', slackInteractions.expressMiddleware())

// need a way to store access tokens for the install. firebase?
app.get('/install', (req, res) => {
  let scopes = ['bot', 'chat:write:bot', 'commands']

  let params = {
    client_id: process.env.SLACK_CLIENT_ID,
    scope: scopes.join(' '),
    redirect_uri: process.env.SLACK_REDIRECT_URL
  }
    
  let url = helpers.getUrlWithParams('https://slack.com/oauth/authorize', params)
  return res.redirect(url)
})

app.get('/redirect', (req, res) => {
  let opt = {
    client_id: process.env.SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    code: req.query.code
  }
  let url = helpers.getUrlWithParams('https://slack.com/api/oauth.access', opt)

	let options = {
		url: url,
		method: 'GET'
	}

  return rp(options)
		.then(result => {
			let slackData = JSON.parse(result)
			if(!slackData) throw new Error('no_slack_api_data_received')
            if(!slackData.ok) throw new Error(slackData.error)
            let teamId = slackData.team_id
            return firestore.collection('teams').doc(teamId).set(slackData)
        })
        .then(result => {
            return res.send('App installed.')
        })
		.catch(err => {
			console.log(err)
			return res.send({error: err.message})
		})
})

// call this URL to start a blueprint
app.get('/start/:blueprint/:message', (req, res) => {
  let blueprint = req.params.blueprint
  let message = req.params.message
      
  let payload = helpers.stringifyValues(blueprints[blueprint].message[message])
  // ATTENTION: `req.query` seems to be cached by glitch when a query parameter is removed
  // e.g. if this url is called with a `channel` parameter first
  // and another call without this parameter is done, the `req.query.channel` parameter 
  // is still set to the old value
  payload.channel = req.query.channel || payload.channel
  
  const slackBot = new SlackClient(process.env.SLACK_BOT_TOKEN)
  
  return slackBot.chat.postMessage(payload)
    .then(() => res.send('starting blueprint: '+blueprint))
    .catch((err) => {
      console.log(err)
      return res.send(err.data)
    })
})

app.post('/slack/onCommand', urlencodedParser, (req, res) => {
  let command = req.body.command.replace('/', '')
  // parsing payload to something which can be handled by handleAction
  let payload = {
    channel: {
      id: req.body.channel_id
    },
    user: {
      id: req.body.user_id
    }
  }
  // stringify the value since handleAction expects a string
  let text = req.body.text
  let action = (text && text.length && blueprints[text.trim()] && blueprints[text.trim()].start) || blueprints.slashCommands[command]  
  action = JSON.stringify(action)
  
  return firestore.collection('teams').doc(req.body.team_id).get()
    .then(doc => handleAction(payload, action, doc.data()))
    .then(() => res.send())
})

app.post('/slack/onEvent', jsonParser, (req, res) => {
  console.log(req.body) 
})

app.post('/slack/options', urlencodedParser, (req, res) => {
    let payload = JSON.parse(req.body.payload)

    return res.send(
      {
        "options": [
          {
          "text": {
            "type": "plain_text",
            "text": payload.value
          },
          "value": payload.value.replace(/ /g, "-")
          }
        ]
      }
    )
})

slackInteractions.action(/(\w+)/, (payload, respond) => {
  let team = payload.team.id
    
  return firestore.collection('teams').doc(team).get()
    .then(doc => {
      switch(payload.type) {
        case 'dialog_submission': 
          handleAction(payload, payload.state, doc.data())
          break
        case 'block_actions':
          console.log(payload.actions[0].selected_option)
          handleAction(payload, payload.actions[0].value || (payload.actions[0].selected_option && payload.actions[0].selected_option.value), doc.data())
          break
        case 'message_action':
          handleAction(payload, payload.callback_id, doc.data())
          break
      }
    })
})

const handleAction = (payload, value, tokens) => {
  try {
    let userToken = (tokens && tokens.access_token) || process.env.SLACK_BOT_TOKEN
    let botToken = (tokens && tokens.bot && tokens.bot.bot_access_token) || process.env.SLACK_USER_TOKEN
    
    const slackUser = new SlackClient(userToken)
    const slackBot = new SlackClient(botToken)
    console.log(value)    
    let actions = JSON.parse(value)
    
    actions.forEach(action => {
      let delay = action.delay || 0
      setTimeout(() => {
        let block = helpers.stringifyValues(blueprints[action.blueprint][action.type][action.value], payload)

        switch(action.type) {
          case 'dialog':  
            return slackBot.dialog.open({
              trigger_id: payload.trigger_id,
              dialog: block
            })
          case 'ephemeral':
            block.channel = (payload.channel && payload.channel.id) || (action.channel && action.channel.id)
            block.user = (payload.user && payload.user.id)
            return slackBot.chat.postEphemeral(block)    
          case 'message':
            block.channel = (payload.channel && payload.channel.id) || (action.channel && action.channel.id)
            console.log(JSON.stringify(block))
            return slackBot.chat.postMessage(block)
          case 'thread':
            block.channel = (payload.channel && payload.channel.id) || (action.channel && action.channel.id)
            block.thread_ts = (payload.message && payload.message.ts) || (action.message && action.message.ts)
            return  slackBot.chat.postMessage(block)  
          case 'update':
            block.channel = (payload.channel && payload.channel.id) || (action.channel && action.channel.id)
            block.ts = (payload.message && payload.message.ts) || (action.message && action.message.ts)
            return  slackBot.chat.update(block)  
        }
      }, delay)
    })
  } catch(e) {
    console.log(e)
  }
}

// slackEvents.on('app_mention', (message) => {
//   console.log(message)
//   let channel = message.channel
//   let user = message.user
  
//   console.log({channel: channel, user: user})
// })

// slackEvents.on('message', (message, event) => {
//    console.log(message)
//   console.log(event)
// //   let channel = message.channel
// //   let user = message.user
  
// //   if(message.channel_type === 'im' && user) console.log({channel: channel, user: user})
// })

// *** Handle errors ***
slackEvents.on('error', (error) => {
  if (error.code === slackEventsApi.errorCodes.TOKEN_VERIFICATION_FAILURE) {
    // This error type also has a `body` propery containing the request body which failed verification.
    console.error(`An unverified request was sent to the Slack events Request URL. Request body: \
${JSON.stringify(error.body)}`)
  } else {
    console.error(`An error occurred while handling a Slack event: ${error.message}`)
  }
})

// Start the express application
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

