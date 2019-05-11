module.exports = {
  configure_channel: {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Pick a channel from the dropdown list*"
    },
    "accessory": {
      "action_id": "configure_channel",
      "type": "channels_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select channel",
        "emoji": true
      }
    }
  },
  invite_channel: {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": "*Invite Bolt to a channel*"
    },
    "accessory": {
      "action_id": "configure_channel",
      "type": "channels_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select channel",
        "emoji": true
      }
    }
  },
  channel_configured: {
    "type": "context",
		"elements": [
			{
				"type": "mrkdwn",
				"text": ":white_check_mark: <#{{channelId}}|{{channelName}}> is now configured as default channel."
			}
		]
  }
}