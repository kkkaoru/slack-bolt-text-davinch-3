# Slack Bolt - Hello World

This is a simple example App built with [Slack's Bolt Framework](https://slack.dev/bolt/tutorial/getting-started) for node.js.

Our App shows a welcome message when a user opens the "app home".

### Slack API & features used in the app

* The [`app_home_opened`](https://api.slack.com/events/app_home_opened) event gets triggered when a user opens the bot's "app home" for the first time
* The app uses the Bolt's `say` method to send a welcome message to the user

### Requirements

* A Bot User must be added to your App
* Your App must be subscribed to [Events API](https://api.slack.com/events-api)
* Your app needs to be subscribed to the events mentioned in the *Events* section

### Scopes

* [`bot`](https://api.slack.com/scopes/bot)

### Events

#### Workspace events
* [`app_home_opened`](https://api.slack.com/events/app_home_opened)

