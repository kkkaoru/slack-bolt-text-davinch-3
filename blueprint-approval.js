module.exports = {
  message: {
    start: {
      channel: "DGGD1E5RA",
      blocks: [
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
              "value": {"blueprint":"approval","type":"update","value":"confirmation"}
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Decline"
              },
              "value": {"blueprint":"approval","type":"dialog","value":"info"}
            }
          ]
        }
      ]
    }
  },
  update: {
    confirmation: {
      blocks: [
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
              "text": ":white_check_mark: You approved this request on 03/14/2019 at 03:45pm",
              "emoji": true
            }
          ]
        }
      ]
    },
    rejection: {
      blocks: [
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
              "text": "*When:*\nSubmitted Mar 14"
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
        },
          {
          "type": "context",
          "elements": [
            {
              "type": "plain_text",
              "text": ":memo: Comment: We don't approve this kind of device.",
              "emoji": true
            }
          ]
        }
      ]
    }
  },
  dialog: {
    info: {
      "callback_id": "dialog:1",
      "title": "Reject request",
      "submit_label": "Reject",
      "elements": [
        {
          "label": "Select a reason",
          "type": "select",
          "name": "reject:reason",
          "options": [
            {
              "label": "Out of Policy",
              "value": "reject:reason:out-of-policy"
            },
            {
              "label": "Invalid request",
              "value": "reject:reason:invalid-request"
            },
            {
              "label": "Other",
              "value": "reject:reason:other"
            }
          ]
        },
        {
          "label": "Comment",
          "name": "comment",
          "type": "textarea",
          "hint": "Provide additional information.",
          "optional": true
        }
      ],
      "state": {"blueprint":"approval","type":"update","value":"rejection"},
      "fill_options": ["message.ts"]
    }
  }
}