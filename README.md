# Block Kit Blueprints App

Simple app to showcase workflows & demos. 

## Install App

Install the Block Kit App on your workspace through [this url](http://block-kit-blueprints.glitch.me/install).

## Create a blueprint

1. Create a new blueprint, e.g. `blueprint-<name-of-blueprint>.js` 
2. Copy the content from `blueprint-template.js` and paste it to your file 
3. Import your blueprint to `blueprints.js`
4. Edit your messages and blueprint
5. Define your `start` flow in your blueprints `.js` file. (See `blueprint-template.js` for an example)

## Start a blueprint

Define your `start` flow in your blueprints `.js` file.
To start a blueprint from Slack, simply call the `/blueprint-demo` slash command followed by the blueprint's name, e.g. `/blueprint-demo template` or `/blueprint-demo` to see a list of available blueprints. 
Blueprint file names and template names are `kebab-case`. E.g. `blueprint-template-demo.js` can be started with `/blueprint-demo template-demo`.

## Message Actions

Use this format as `callback_id` for message actions:

```
[{"blueprint":"template","type":"dialog","value":"demo"}]
```

## Slash Commands

To make use of slash commands you can define the flow it should trigger in `slash-commands.js`. The json key has to be the same name as your slash command without the `/`, e.g. for the slash command `/blueprint-demo` it should look like this:

```
demo: [{"blueprint":"template","type":"message","value":"slash"}]
```

## Sending multiple and delayed messages

If you want to send multiple messages at once, you can do that by adding multiple instructions to the `value` (message actions) or `state` (dialogs) array.

In this example, `message_1` is sent immediately after the interaction, `message_2` 2 seconds after the interaction, and `message_3` 4 seconds after the interaction
```
[
  {"blueprint":"template","type":"message","value":"message_1","delay":0},
  {"blueprint":"template","type":"message","value":"message_2","delay":2000},
  {"blueprint":"template","type":"message","value":"message_3","delay":4000}
]
```

# Set up your own Slack App

Feel free to [remix](https://glitch.com/edit/#!/remix/block-kit-blueprints) this project and set up your own Slack App.

## Setup

1. Create your app at [api.slack.com](https://api.slack.com/apps)
2. Create a bot user
3. Install App to a workspace
4. Copy **OAuth Access Token**, **Bot User OAuth Access Token**, **Signing Secret** to your `.env` file
5. Add features and functionality
  * Interactive components (Request Url: `https://{{your-glitch-project}}.glitch.me/slack/onAction`)
  * Event subscriptions (Request Url: `https://{{your-glitch-project}}.glitch.me/slack/onEvent`)
  * Permissions (`bot`, `chat:write:bot`)
  * Add the `/blueprint-demo` slash command
  





  