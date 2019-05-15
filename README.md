# Slack Bolt blueprint

This is an example App built with Slack's Bolt Framework in node.js.

Our App is a simple reactji channeler which reposts messages from any channel the Bot user is part of to a configured channel, simply by reacting with the ⚡ emoji to any of these messages.

Features:

* Show a welcome message to the user when they open the App's DM with [`app_home_opened` event](https://api.slack.com/events/app_home_opened)
* Let the user configure a default channel for reposting messages to
* Show a confirmation message once the default channel is set and provide an option to invite our Bot User to existing channels
* Once our App is invited to a channel it will introduce itself with [`member_joined_channel` event](https://api.slack.com/events/member_joined_channel)
* When a user adds a reaction with the ⚡ emoji to a message in a channel where the Bot User is part of, it will post a link of this message to the configured channel.

Requirements:

* A Bot User must be added to your App
* Your App must be subscribed to [Events API](https://api.slack.com/events-api)
* [Interactive components](https://api.slack.com/reference/messaging/interactive-components) must be enabled
* 