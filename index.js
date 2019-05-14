const { App } = require('@slack/bolt')
const store = require('./store')
const blocks = require('./blocks')
const messages = require('./messages')

const app = new App({
  authorize: () => {
    // TODO: fill in the user token. you might need to get this from a database or something if you have multiple installers.
    return Promise.resolve({
      botToken: process.env.SLACK_BOT_TOKEN,
      userToken: process.env.SLACK_USER_TOKEN,
    });
  },
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  ignoreSelf: false,
  logLevel: 'DEBUG'
})

/**
`app_home_opened` event is triggered when a user has entered into the App Home space (= Bot User DM)

https://api.slack.com/events/app_home_opened

We use this event to show the user an interactive help message once they open a DM with our App
**/
app.event('app_home_opened', ({ event, say }) => {  
  let user = store.getUser(event.user)
  
  if(!user) {
    user = {
      user: event.user,
      channel: event.channel
    }
    store.addUser(user)
    
    let message = messages.welcome_app_home
    message.blocks.push(blocks.configure_channel)
    
    say(message)
  } 
})

/**
`reaction_added` event is triggered when a user adds a reaction to a message in a channel where the Bot User is part of

https://api.slack.com/events/reaction_added

We use this event to show the user an interactive help message once they open a DM with our App
**/
app.event('reaction_added', async ({ event, context, say }) => { 
  console.log(event)
  // only react to ⚡ (:zap:) emoji
  if(event.reaction === 'zap') {
    let channelId = event.item.channel
    let ts = event.item.ts
    
    // get a permalink for this message
    const permalink = await app.client.chat.getPermalink({
      token: context.botToken,
      message_ts: ts,
      channel: channelId
    })
    
    // get user info of user who reacted to this message
    const user = await app.client.users.info({
      token: context.botToken,
      user: event.user
    })
    
    let name = '<@'+user.user.id+'>'
    let channel = store.getChannel()
    
    // post this message to the configured channel
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: channel && channel.id,
      text: name+' wants you to see this message: '+permalink.permalink,
      unfurl_links: true,
      unfurl_media: true
    })
  }
})

/**
`member_joined_channel` event is triggered when a user joins public or private channels

https://api.slack.com/events/member_joined_channel

We use this event to introduce our App once it's added to a channel
**/
app.event('member_joined_channel', async ({ context, event, say }) => { 
  console.log(event)

  let channel = store.getChannel()
  let user = event.user
  
  // check if our Bot user itself is joining the channel
  if(user === store.getMe() && channel) {
    console.log('it\'s me!')

    let message = messages.welcome_channel
    message.blocks[0].text.text.replace('{{channelName}}', channel.name).replace('{{channelId}}', channel.id)
    say(message)
  }

})

app.action({action_id: 'configure_channel'}, async ({ context, action, ack, respond }) => {
  ack()
    
  let channelId = action.selected_channel
  let ts = action.action_ts
  
  let channelInfo = await app.client.channels.info({
    token: context.botToken,
    channel: channel
  })
    
  store.setChannel({
    name: channelInfo.channel.name,
    id: channelId
  })
  
  let message = messages.welcome_app_home
  let confirmation = blocks.channel_configured
  // fill placeholders with channel data
  confirmation.elements[0].text = confirmation.elements[0].text.replace('{{channelId}}', channelId).replace('{{channelName}}', channelInfo.channel.name)
  message.blocks.push(confirmation)
  message.blocks.push(blocks.invite_channel)
  
  // update message instead of sending a new one
  message.replace_original = true
  respond(message) 
})

app.error((error) => {
	// Check the details of the error to handle cases where you should retry sending a message or stop the app
	console.error(error);
})

// Start your app
;(async () => {
  await app.start(process.env.PORT || 3000)

  console.log('⚡️ Bolt app is running!')
  
  let id = await app.client.auth.test({ token: process.env.SLACK_BOT_TOKEN })
      .then(result => result.user_id)
  store.setMe(id)
})()

