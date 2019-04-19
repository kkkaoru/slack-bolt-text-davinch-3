module.exports = {
  start: [{"blueprint":"hr-review","type":"message","value":"start"}],
  dialog: {
    feedback: {
      "callback_id": "dialog:feedback",
      "title": "Give feedback",
      "submit_label": "Send feedback",
      "elements": [
        {
          "label": "Select your colleague",
          "type": "select",
          "name": "reject:reason",
          "data_source": "users"
        },
        {
          "label": "What do you want to share?",
          "name": "feedback",
          "type": "textarea",
          "placeholder": "Enter your feedback here.",
          "optional": true
        },
        {
          "label": "Choose visibility",
          "name": "visibility",
          "type": "select",
          "options": [
            {
              "label": "Private",
              "value": "private"
            },
            {
              "label": "Private + Manager",
              "value": "private+manager"
            },
            {
              "label": "Manager only",
              "value": "manager"
            }
          ]
        }
      ],
      "state": [{"blueprint":"hr-review","type":"ephemeral","value":"confirmation"}]
    }
  },
  ephemeral: {},
  message: {
    start : {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Hi <fakelink.toUser.com|David>!* Here's how I can help you:"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":dollar: *Pay*\nView latest pay info, history and summary"
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Choose",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Latest Pay",
                  "emoji": true
                },
                "value": "pay"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Summary",
                  "emoji": true
                },
                "value": "value-1"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Pay History",
                  "emoji": true
                },
                "value": "value-1"
              }
            ]
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":speaking_head_in_silhouette: *Peer reviews*\nGive and receive feedback from your colleagues"
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Choose",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Give feedback",
                  "emoji": true
                },
                "value": [{"blueprint":"hr-review","type":"dialog","value":"feedback"}]
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Request feedback",
                  "emoji": true
                },
                "value": "value-1"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Your reviews",
                  "emoji": true
                },
                "value": "value-1"
              }
            ]
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":clock1: *Time off*\nManage and view your time off requests"
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Choose",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Request time off",
                  "emoji": true
                },
                "value": "pay"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "See requests",
                  "emoji": true
                },
                "value": "value-1"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Your reviews",
                  "emoji": true
                },
                "value": "value-1"
              }
            ]
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":gear: *Settings*\nNotifications, Account settings and more"
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Choose",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Notifications",
                  "emoji": true
                },
                "value": "value-0"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Choice 2",
                  "emoji": true
                },
                "value": "value-1"
              }
            ]
          }
        }
      ]
    }
  },
  thread: {},
  update: {}
}