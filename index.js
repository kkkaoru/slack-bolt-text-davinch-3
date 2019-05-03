const { App } = require('@slack/bolt')
const store = require('./store')

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
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

app.event('reaction_added', ({ event, say }) => { 
  // eyes
  // white_check_mark
  console.log(event)
})

app.event('member_joined_channel', ({ event, say }) => { 
  console.log(event)
})

;(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000)

  console.log('⚡️ Bolt app is running!')
})()

