# Block Kit Blueprints App

Simple app to showcase App demos. Feel free to clone this app and set up your own Slack App.

## Setup

1. Create your app at [api.slack.com](https://api.slack.com/apps)
2. Create a bot user
3. Install App to a workspace
4. Copy **OAuth Access Token**, **Bot User OAuth Access Token**, **Signing Secret** to your `.env` file
5. Add features and functionality
  * Interactive components (Request Url: `https://{{your-glitch-project}}.glitch.me/slack/onAction`)
  * Event subscriptions (Request Url: `https://{{your-glitch-project}}.glitch.me/slack/onEvent`)
  * Permissions (`bot`, `chat:write:bot`)
  
## Sending messages

1. Copy `blocks-template.js`
2. Import your blocks to `blocks.js`
3. Edit your messages and flow

## Start a flow

Each flow starts with a message from an App, which means you need to know the channel you want to send your first message to.
You can find your channel id either:
1. in the URL by opening Slack in a browser
2. mentioning the bot user in channel
3. sending a DM to the bot user

for 2. & 3. the channel & user id will be logged in Glitch's Log (bottom left -> Tools -> Log)

The channel can be specified either as field in the message json or as url parameter.

To start a flow you just need to call the start url:
`https://{{your-glitch-project}}.glitch.me/start/:flow/:message`,
where `:flow` is the flow name of your `blocks-` file (e.g. for `blocks-template.js` it's `template`) and `:message` is the first message you want to send (e.g. for `blocks-template.js` it's `demo`)
to specify a start message. 
  