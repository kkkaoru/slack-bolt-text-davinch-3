# Slack Bolt - Hello World

This is a simple example App built with [Slack's Bolt Framework](https://slack.dev/bolt/tutorial/getting-started) for node.js.

Our App responds back the user, who DMs the bot.

### Slack API & features used in the app

* Triggers the events, [`app_home_opened`](https://api.slack.com/events/app_home_opened) when a user DMs the bot
* TUse the Bolt's `say` method to send a DM message back to the user

### Requirements

* A Bot User must be added to your App
* Your App must be subscribed to [Events API](https://api.slack.com/events-api)
* Your app needs to be subscribed to the events mentioned in the *Events* section

### Scopes

* [`bot`](https://api.slack.com/scopes/bot)

### Events

#### Workspace events
* [`app_home_opened`](https://api.slack.com/events/app_home_opened)

#### Bot events
* [`member_joined_channel`](https://api.slack.com/events/member_joined_channel)
* [`reaction_added`](https://api.slack.com/events/reaction_added)