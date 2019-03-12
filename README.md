# Block Kit Blueprints App

Simple app to showcase App demos

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

2. Edit messages and workflow as needed
  