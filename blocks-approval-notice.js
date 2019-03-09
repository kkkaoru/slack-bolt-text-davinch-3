const request = [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "You have a new request:\n*<fakeLink.toEmployeeProfile.com|Fred Enriquez - New device request>*"
		}
	},
	{
		"type": "section",
		"fields": [
			{
				"type": "mrkdwn",
				"text": "*Type:*\nComputer (laptop)"
			},
			{
				"type": "mrkdwn",
				"text": "*When:*\nSubmitted Aut 10"
			},
			{
				"type": "mrkdwn",
				"text": "*Last Update:*\nMar 10, 2015 (3 years, 5 months)"
			},
			{
				"type": "mrkdwn",
				"text": "*Reason:*\nAll vowel keys aren't working."
			},
			{
				"type": "mrkdwn",
				"text": "*Specs:*\n\"Cheetah Pro 15\" - Fast, really fast\""
			}
		]
	},
	{
		"type": "actions",
		"elements": [
			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Approve"
				},
				"value": "request:approve"
			},
			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Deny"
				},
				"value": "request:deny"
			}
		]
	}
]

const confirmation = [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "You have a new request:\n*<fakeLink.toEmployeeProfile.com|Fred Enriquez - New device request>*"
		}
	},
	{
		"type": "section",
		"fields": [
			{
				"type": "mrkdwn",
				"text": "*Type:*\nComputer (laptop)"
			},
			{
				"type": "mrkdwn",
				"text": "*When:*\nSubmitted Aut 10"
			},
			{
				"type": "mrkdwn",
				"text": "*Last Update:*\nMar 10, 2015 (3 years, 5 months)"
			},
			{
				"type": "mrkdwn",
				"text": "*Reason:*\nAll vowel keys aren't working."
			},
			{
				"type": "mrkdwn",
				"text": "*Specs:*\n\"Cheetah Pro 15\" - Fast, really fast\""
			}
		]
	},
	{
		"type": "context",
		"elements": [
			{
				"type": "plain_text",
				"text": ":white_check_mark: Approved by you on 03/14/2015 03:45pm",
				"emoji": true
			}
		]
	}
]

const denial = [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "You have a new request:\n*<fakeLink.toEmployeeProfile.com|Fred Enriquez - New device request>*"
		}
	},
	{
		"type": "section",
		"fields": [
			{
				"type": "mrkdwn",
				"text": "*Type:*\nComputer (laptop)"
			},
			{
				"type": "mrkdwn",
				"text": "*When:*\nSubmitted Aut 10"
			},
			{
				"type": "mrkdwn",
				"text": "*Last Update:*\nMar 10, 2015 (3 years, 5 months)"
			},
			{
				"type": "mrkdwn",
				"text": "*Reason:*\nAll vowel keys aren't working."
			},
			{
				"type": "mrkdwn",
				"text": "*Specs:*\n\"Cheetah Pro 15\" - Fast, really fast\""
			}
		]
	},
	{
		"type": "context",
		"elements": [
			{
				"type": "plain_text",
				"text": ":x: You declined this request on 03/14/2019 at 03:45pm",
				"emoji": true
			}
		]
	},
	{
		"type": "context",
		"elements": [
			{
				"type": "plain_text",
				"text": ":information_source: Reason: Out of Policy",
				"emoji": true
			}
		]
	}
]

module.exports = { request, confirmation, denial }
  


