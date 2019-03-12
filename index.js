const slackEventsApi = require('@slack/events-api')
const { createMessageAdapter } = require('@slack/interactive-messages')
const SlackClient = require('@slack/client').WebClient
const express = require('express')

const app = express()
const slackUser = new SlackClient(process.env.SLACK_USER_TOKEN)
const slackBot = new SlackClient(process.env.SLACK_BOT_TOKEN)
const slackEvents = slackEventsApi.createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET)
const blocks = require('./blocks')
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

// this starts the flow
app.get('/start/:flow/:message', (req, res) => {
  let flow = req.params.flow
  let message = req.params.message
    
  let payload = helpers.stringifyValues(blocks[flow].message[message])
  // ATTENTION: `req.query` seems to be cached by glitch when a query parameter is removed
  // e.g. if this url is called with a `channel` parameter first
  // and another call without this parameter is done, the `req.query.channel` parameter 
  // is still set to the old value
  payload.channel = req.query.channel || payload.channel
  
  return slackBot.chat.postMessage(payload)
    .then(() => res.send('starting interactive demo: '+flow))
    .catch((err) => {
      console.log(err)
      return res.send(err.data)
    })
})

slackInteractions.action({ type: 'button' }, (payload, respond) => {
  console.log('received action')
  let action = JSON.parse(payload.actions[0].value)
  console.log('chosen block', blocks[action.blueprint][action.type][action.value])
  let block = helpers.stringifyValues(blocks[action.blueprint][action.type][action.value])
  console.log('edited block', block)
    
  switch(action.type) {
    case 'dialog':  
      console.log(action)
      return slackBot.dialog.open({
        dialog: block
      })
    case 'ephemeral':
      let ephemeral = block
      ephemeral.channel = payload.channel.id
      ephemeral.user = payload.user.id
      console.log(ephemeral)
      return slackBot.chat.postEphemeral(ephemeral)    
    case 'message':
      let message = block
      message.channel = payload.channel.id
      return slackBot.chat.postMessage(message)
    case 'thread':
      let thread = block
      thread.channel = payload.channel.id
      thread.thread_ts = payload.message.ts
      return slackBot.chat.postMessage(thread)  
    case 'update':
      let update = block
      update.channel = payload.channel.id
      update.ts = payload.message.ts
      return slackBot.chat.update(update)  
  }
})

slackEvents.on('app_mention', (message) => {
  let channel = message.channel
  let user = message.user
  
  console.log({channel: channel, user: user})
})

slackEvents.on('message', (message) => {
  let channel = message.channel
  let user = message.user
  
  console.log({channel: channel, user: user})
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

