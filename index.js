const { App } = require('@slack/bolt')
const store = require('./store')
const messages = require('./messages')
const helpers = require('./helpers')

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
    
    
    say(messages.welcome_app_home)
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
  let channel = store.getChannel()
  let user = event.user
  
  // check if our Bot user itself is joining the channel
  if(user === store.getMe() && channel) {
    console.log('it\'s me!')

    let message = helpers.copy(messages.welcome_channel)
    // fill in placeholder values with channel info
    message.blocks[0].text.text = message.blocks[0].text.text.replace('{{channelName}}', channel.name).replace('{{channelId}}', channel.id)
    say(message)
  }

})

app.action({action_id: 'configure_channel'}, async ({ context, action, ack, respond }) => {
  ack()
    
  let channelId = action.selected_channel
  
  // retrieve channel info
  let channelInfo = await app.client.channels.info({
    token: context.botToken,
    channel: channelId
  })
    
  // save the configured channel to our store
  store.setChannel({
    name: channelInfo.channel.name,
    id: channelId
  })
  
  let message = helpers.copy(messages.channel_configured)
  // fill in placeholder values with channel info
  message.blocks[0].text.text = message.blocks[0].text.text.replace('{{channelId}}', channelId).replace('{{channelName}}', channelInfo.channel.name)
  respond(message) 
})

app.action({action_id: 'add_to_channel'}, async ({ context, action, ack, say }) => {
  ack()
   
  let channelId = action.selected_channel
  console.log(channelId)
  
  // retrieve channel info
  let channelInfo = await app.client.channels.info({
    token: context.botToken,
    channel: channelId
  })
    
  // invite Bot user to channel
  await app.client.channels.invite({
    token: context.userToken,
    channel: channelId,
    user: store.getMe()
  })
  
  let message = helpers.copy(messages.added_to_channel)
  // fill in placeholder values with channel info
  message.blocks[0].text.text = message.blocks[0].text.text.replace('{{channelId}}', channelId).replace('{{channelName}}', channelInfo.channel.name)
  console.log(message.blocks[0].text.text )
  say(message) 
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

