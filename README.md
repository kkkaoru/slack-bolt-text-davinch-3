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

1. Create a new blueprint, e.g. `blueprint-<name-of-blueprint>.js` 
2. Copy the content from `blueprint-template.js` and paste it to your file 
3. Import your blueprint to `blueprints.js`
4. Edit your messages and blueprint

## Start a blueprint

Each blueprint starts with a message from an App, which means you need to know the channel you want to send your first message to.
You can find your channel id either:
1. in the URL by opening Slack in a browser
2. mentioning the bot user in channel
3. sending a DM to the bot user

for 2. & 3. the channel & user id will be logged in Glitch's Log (bottom left -> Tools -> Log)

To start a blueprint you just need to call the start url:
* `https://{{your-glitch-project}}.glitch.me/start/:blueprint/:message`
where 
* `:blueprint` is the blueprint name of your `blueprint-` file (e.g. for `blueprint-template.js` it's `template`) 
and 
* `:message` is the first message you want to send (e.g. for `blueprint-template.js` it's `demo`).

The channel can be specified either as field in the message json (see `blueprint-template.js` -> `message` -> `demo` -> `channel`) or as url parameter (`?channel=CXXXXXXXX`).

## Message Actions

Use this format as `callback_id` for message actions:

```
[{"blueprint":"template","type":"dialog","value":"demo"}]
```

## Slash Commands

To make use of slash commands you can define the flow it should trigger in `slash-commands.js`. The json key has to be the same name as your slash command without the `/`, e.g. for the slash command `/demo` it should look like this:

```
demo: [{"blueprint":"template","type":"message","value":"slash"}]
```
  