const slackEventsApi = require('@slack/events-api')
const { createMessageAdapter } = require('@slack/interactive-messages')
const SlackClient = require('@slack/client').WebClient
const express = require('express')

const app = express()
const slackUser = new SlackClient(process.env.SLACK_USER_TOKEN)
const slackBot = new SlackClient(process.env.SLACK_BOT_TOKEN)
const slackEvents = slackEventsApi.createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET)
const blueprints = require('./blueprints')
const helpers = require('./helpers')

app.use('/slack/onEvent', slackEvents.expressMiddleware())
app.use('/slack/onAction', slackInteractions.expressMiddleware())

// need a way to store access tokens for the install. firebase?
// app.get('/install', (req, res) => {
//   let scopes = ['bot', 'chat:write:bot']

//   let params = {
//     client_id: process.env.SLACK_CIENT_ID,
//     scope: scopes.join(' '),
//     redirect_uri: process.env.SLACK_REDIRECT_URL
//   }
  
//   let url = getUrlWithParams('https://slack.com/oauth/authorize', params)
//   return res.redirect(url)
// })

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
  
  return slackBot.chat.postMessage(payload)
    .then(() => res.send('starting blueprint: '+blueprint))
    .catch((err) => {
      console.log(err)
      return res.send(err.data)
    })
})

slackInteractions.action(/(\w+)/, (payload, respond) => {
  console.log(payload)
  switch(payload.type) {
    case 'dialog_submission': 
      handleAction(payload, payload.state)
      break
    case 'block_actions':
      handleAction(payload, payload.actions[0].value)
      break
    case 'message_action':
      handleAction(payload, payload.callback_id)
      break
  }
  
})

const handleAction = (payload, value) => {
  try {
    let actions = JSON.parse(value)
    
    actions.forEach(action => {
      let delay = action.delay || 0
      setTimeout(() => {
        let block = blueprints[action.blueprint][action.type][action.value]
        // order of these two functions is important here
        block = helpers.fillOptions(block, payload)
        block = helpers.stringifyValues(block)

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

slackEvents.on('app_mention', (message) => {
  let channel = message.channel
  let user = message.user
  
  console.log({channel: channel, user: user})
})

slackEvents.on('message', (message) => {
  let channel = message.channel
  let user = message.user
  
  if(message.channel_type === 'im' && user) console.log({channel: channel, user: user})
  
  console.log(message)
})


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

