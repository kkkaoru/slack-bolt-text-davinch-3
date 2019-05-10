module.exports = {
  channel_configured: {
    "type": "context",
		"elements": [
			{
				"type": "mrkdwn",
				"text": ":white_check_mark: <{{channel}}> is now configured as default channel."
			}
		]
  }
}