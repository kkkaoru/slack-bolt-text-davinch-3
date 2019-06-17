const { App } = require('@slack/bolt')


const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: 'DEBUG'
});

/**

`app_home_opened` event is triggered when a user has entered into the App Home space (= Bot User DM)

https://api.slack.com/events/app_home_opened

We use this event to show the user an interactive welcome message once they open a DM with our App

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


app.error((error) => {
	// Check the details of the error to handle cases where you should retry sending a message or stop the app
	console.error(error)
})

// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})()

