module.exports = {
  start: [{"blueprint":"hr-timeoff","type":"message","value":"start"}],
  dialog: {},
  ephemeral: {},
  message: {
    start : {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Request your time off*"
          }
        },
          {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Choose your request type"
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Request type",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Paid Time Off",
                  "emoji": true
                },
                "value": [{"blueprint":"hr-timeoff","type":"update","value":"step"}]
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Jury Duty",
                  "emoji": true
                },
                "value": [{"blueprint":"hr-timeoff","type":"update","value":"step"}]
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Volunteering Day",
                  "emoji": true
                },
                "value": [{"blueprint":"hr-timeoff","type":"update","value":"step"}]
              }
            ]
          }
        }
      ]
    }
  },
  thread: {},
  update: {
    step: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Request your time off*"
          }
        },
          {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Choose your request type"
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Request type",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Paid Time Off",
                  "emoji": true
                },
                "value": [{"blueprint":"hr-timeoff","type":"update","value":"step"}]
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Jury Duty",
                  "emoji": true
                },
                "value": [{"blueprint":"hr-timeoff","type":"update","value":"step"}]
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Volunteering Day",
                  "emoji": true
                },
                "value": [{"blueprint":"hr-timeoff","type":"update","value":"step"}]
              }
            ],
            "initial_option": {
                "text": {
                  "type": "plain_text",
                  "text": "Paid Time Off",
                  "emoji": true
                },
                "value": "[{\"blueprint\":\"hr-timeoff\",\"type\":\"update\",\"value\":\"step\"}]"
            }
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Select *Start Date*"
          },
          "accessory": {
            "type": "datepicker",
            "placeholder": {
              "type": "plain_text",
              "text": "Select date",
              "emoji": true
            }
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Select *End Date*"
          },
          "accessory": {
            "type": "datepicker",
            "placeholder": {
              "type": "plain_text",
              "text": "Select date",
              "emoji": true
            }
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Send request",
                "emoji": true
              },
              "style": "primary",
              "value": [{"blueprint":"hr-timeoff","type":"update","value":"confirmation"}]
            },
                  {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Cancel request",
                "emoji": true
              },
              "value": "click_me_123"
            }
          ]
        }
      ]
    },
    confirmation: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Your request for *Paid Time Off* has been sent."
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Start Date:*\nApr 10, 2019"
            },
            {
              "type": "mrkdwn",
              "text": "*End Date:*\nApr 12, 2019"
            }
          ]
        }
      ]
    }
  }
}