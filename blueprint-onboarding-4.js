module.exports = {
  // this defines the start flow
  start: [{"blueprint":"onboarding4","type":"message","value":"start"}],
  // definitions of dialogs
  message: {
    start: {
      blocks: [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "Hi David :wave:"
		}
	},
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "Great to see you here! App helps you to stay up-to-date with your meetings and events right here within Slack. To get started please connect your existing calendar by clicking the button below."
		}
	},
	{
		"type": "actions",
		"elements": [
			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Connect account",
					"emoji": true
				},
				"value": "click_me_123"
			}
		]
	}
]
    }
  }
}
