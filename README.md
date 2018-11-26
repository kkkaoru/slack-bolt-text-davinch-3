# Node SDK Tutorial: "Greet & React" 

This example shows a fully functioning but very simple application using the
[Slack Event Adapter](https://github.com/slackapi/node-slack-events-api).

![GIF](https://cdn.glitch.com/da97701b-09c2-4736-8e53-5d178a5de7b6%2Fgreet-bot.gif?1538001872223)

First, "Remix" (like fork, in GitHub) this repo so you can have your own version of this project.

## Setup

### Create a Slack app
1. Create an app at [api.slack.com/apps](https://api.slack.com/apps)
2. Click on `Bot Users` on the left side navigation
3. Give your bot user a name (e.g. "@greet_bot"), turn _Always Show My Bot as Online_ on, and save your
changes

### Enable Events
1. Go back to the app settings and click on **Event Subscriptions** on the left side navigation
2. Enable events and enter your _Request URL_:
	- Glitch URL (sould look something like `https://my-stuff.glitch.me/`) + `/slack/events`
3. After you set up the _Request URL_, you should add event subscriptions under the **Subscribe to Bot Events**. Add `app_mention` and `reaction_added`. Then Save.



## Run this App

### Remix this porject

1. Get the code
  - "Remix" the code to your Glitch repo:
	[glitch.com/edit/#!/remix/greet-bot](https://glitch.com/edit/#!/remix/greet-bot)
2. Set the environment variables (all available on the *Basic Information* page) to `.env` 
	- `SLACK_SIGNING_SECRET`: Your app's _Signing Secret_
  - `SLACK_ACCESS_TOKEN` : Your bot token (Install app once to get an access token, `-xoxb-`)

The Node app should run on glitch automatically.


### (Re)install & Try the bot

1. Go to **Install App** and click _Install App to Workspace_ button
2. You can invite the Bot User into a channel (e.g. `/invite @greet_bot`), and post a message like `hi, @greet_bot` in the channel. It should respond to you. You can also add reactions to messages and the Bot User will send a message using the same emoji.