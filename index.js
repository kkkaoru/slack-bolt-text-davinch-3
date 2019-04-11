const slackEventsApi = require('@slack/events-api')
const { createMessageAdapter } = require('@slack/interactive-messages')
const SlackClient = require('@slack/client').WebClient
const express = require('express')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()
const rp = require('request-promise')
const fs = require('fs')
const markdown = require('markdown-it')
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

app.use('/slack/onEvent', slackEvents.expressMiddleware())
app.use('/slack/onAction', slackInteractions.expressMiddleware())

app.get('/', (req, res) => {
  let contents = fs.readFileSync('README.md', 'utf8')
  let md = new markdown()
  return res.send(md.render(contents))
})

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

app.post('/slack/onCommand', urlencodedParser, (req, res) => {
  let command = req.body.command.replace('/', '')
  
  // parsing payload to something which can be handled by executeAction
  let payload = {
    channel: {
      id: req.body.channel_id
    },
    user: {
      id: req.body.user_id
    }
  }
  // stringify the value since executeAction expects a string
  let text = req.body.text
  let action 
  
  if(command === 'blueprint-settings') {
    let text = req.body.text
    let setting = text.split(' ', 1)[0]
    let value = text.split(' ').slice(1).join(' ')
    console.log(setting)
    console.log(value)
    if(setting !== 'app_name' && setting !== 'app_icon') {
      action = blueprints.slashCommands[command]
    } else {
      let json = {}
      json[setting] = value
      firestore.collection('teams').doc(req.body.team_id).set(json, {merge: true})   
      action = blueprints.slashCommands['blueprint-settings-'+(setting.replace('_', '-'))]
    } 
  } else {
    action = (text && text.length && blueprints[text.trim()] && blueprints[text.trim()].start) || blueprints.slashCommands[command]
  } 
  
  return executeCommand(payload, action, req.body.team_id)
      .then(() => res.send()) 
})

// app.post('/slack/onEvent', jsonParser, (req, res) => {
//   console.log(req.body) 
// })

app.post('/slack/options', urlencodedParser, (req, res) => {
    let payload = JSON.parse(req.body.payload)
    
    console.log(payload)
  
    switch (payload.type) {
      case 'dialog_suggestion':
        return res.send({
          "options": [
            {
              "label": payload.value,
              "value": payload.value.replace(/ /g, "-")
            }
          ]
        })
        break
      case 'block_suggestion':
        return res.send({
          "options": [
            {
            "text": {
              "type": "plain_text",
              "text": payload.value
            },
            "value": payload.value.replace(/ /g, "-")
            }
          ]
        })
        break  
    }    

    
})

slackInteractions.action(/(\w+)/, (payload, respond) => {
  let team = payload.team.id
    
  return firestore.collection('teams').doc(team).get()
    .then(doc => {
      switch(payload.type) {
        case 'dialog_submission': 
          executeAction(payload, payload.state, doc.data())
          break
        case 'block_actions':
          console.log(payload.actions[0].selected_option)
          executeAction(payload, payload.actions[0].value || (payload.actions[0].selected_option && payload.actions[0].selected_option.value), doc.data())
          break
        case 'message_action':
          executeAction(payload, payload.callback_id, doc.data())
          break
      }
    })
})

const executeAction = (payload, value, tokens) => {
  try {
    let userToken = (tokens && tokens.access_token) || process.env.SLACK_BOT_TOKEN
    let botToken = (tokens && tokens.bot && tokens.bot.bot_access_token) || process.env.SLACK_USER_TOKEN
    
    const slackUser = new SlackClient(userToken)
    const slackBot = new SlackClient(botToken)
    let actions = JSON.parse(value)
    
    actions.forEach(action => {
      let delay = action.delay || 0
      setTimeout(() => {
        let block = helpers.stringifyValues(blueprints[action.blueprint][action.type][action.value], payload)
        
        if(tokens && tokens.app_name) block.username = tokens.app_name
        if(tokens && tokens.app_icon) block.icon_url = tokens.app_icon

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
            return slackBot.chat.postMessage(block)
          case 'thread':
            block.channel = (payload.channel && payload.channel.id) || (action.channel && action.channel.id)
            block.thread_ts = (payload.message && payload.message.ts) || (action.message && action.message.ts)
            return slackBot.chat.postMessage(block)  
          case 'update':
            block.channel = (payload.channel && payload.channel.id) || (action.channel && action.channel.id)
            block.ts = (payload.message && payload.message.ts) || (action.message && action.message.ts)
            return slackBot.chat.update(block)  
        }
      }, delay)
    })
  } catch(e) {
    console.log(e)
  }
}

const executeCommand = (payload, action, teamId) => {
   
  action = JSON.stringify(action)
    
  return firestore.collection('teams').doc(teamId).get()
    .then(doc => executeAction(payload, action, doc.data()))
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

