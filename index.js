const { App } = require('@slack/bolt')
const express = require('express')
const fs = require('fs')
const markdown = require('markdown-it')

const helpers = require('./helpers')

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})()

