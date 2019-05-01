const { App } = require('@slack/bolt')
const express = require('express')
const fs = require('fs')
const markdown = require('markdown-it')

const store = require('./store')

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

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
});

app.event('reaction_added', ({ event, say }) => { 
  console.log(event)
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000)

  console.log('⚡️ Bolt app is running!')
})();

