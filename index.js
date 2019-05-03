const { App } = require('@slack/bolt')
const store = require('./store')

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

const user = new App({
  token: process.env.SLACK_BOT_TOKEN,
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
    console.log("add user")
    user = {
      user: event.user,
      channel: event.channel
    }
    store.addUser(user)
    say('Hi')
  } 
})

app.event('reaction_added', async ({ event, context, say }) => { 
  if(event.reaction === 'zap') {
    let channel = event.item.channel
    let ts = event.item.ts
    const result = await app.client.chat.getPermalink({
      token: context.botToken,
      message_ts: ts,
      channel: channel
    })
    let permalink = result.permalink
    
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: 'CJE5T16QY',
      text: 'David wants you to see this message: '+permalink,
      unfurl_links: true,
      unfurl_media: true
    })
  }
})

app.event('member_joined_channel', ({ event, say }) => { 
  console.log(event)
})

;(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000)

  console.log('⚡️ Bolt app is running!')
})()

