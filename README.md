# Greet and React Example

This example shows a fully functioning but very simple application using the
[Slack Event Adapter](https://github.com/slackapi/node-slack-events-api).

## Setup

### Create a Slack app
1. Create an app at [api.slack.com/apps](https://api.slack.com/apps)
2. Click on `Bot Users` on the left side navigation
3. Give your bot user a name (e.g. "@greetandreact"), turn _Always Show My Bot as Online_ on, and save your
changes

### Run locally or [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/slack-greet-and-react-example)

1. Get the code
  - "Remix" the code to your Glitch repo:
	[glitch.com/edit/#!/remix/slack-greet-and-react-example](https://glitch.com/edit/#!/remix/slack-greet-and-react-example)
2. Set the environment variables (all available on the *Basic Information* page) to `.env` 
	- `SLACK_SIGNING_SECRET`: Your app's _Signing Secret_


### Enable Events
1. Go back to the app settings and click on `Event Subscriptions` on the left side navigation
2. Enable events and enter your _Request URL_:
	- Glitch URL (sould look something like `https://my-stuff.glitch.me/`) + `/slack/events`
3. After you set up the _Request URL_, you should add event subscriptions under the "Bot Events" category. Add `message.channels` and `reaction_added`.
4. Go to `OAuth & Permissions` item on the left side navigation, and input the _Redirect URL_:
	- Glitch URL + `/auth/slack/callback`

## Installation and Usage
1. Go to **Install App** and click _Install App to Workspace_ button
3. You can invite the Bot User into a channel (e.g. `/invite @greetandreact`), and say "hi" in the
channel. It should respond to you. You can also add reactions to messages and the Bot User will send
a message using the same emoji.