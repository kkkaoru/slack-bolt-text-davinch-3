module.exports = {
  start: [{"blueprint":"hr-survey","type":"message","value":"start"}],
  dialog: {},
  ephemeral: {},
  message: {
    start : {
      blocks: [
        
      ]
    }
  },
  thread: {},
  update: {
    step1: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Question 1*"
          },
          "accessory": {
            "type": "overflow",
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": ":back: Previous",
                  "emoji": true
                },
                "value": "previous"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": ":x: Cancel",
                  "emoji": true
                },
                "value": "cancel"
              }
            ]
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "This job is a good fit for a person like me."
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Fully agree",
                "emoji": true
              },
              "style": "primary",
              "value": [{"blueprint":"hr-survey","type":"update","value":"step2"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Agree",
                "emoji": true
              },
              "value": [{"blueprint":"hr-survey","type":"update","value":"step2"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Neutral",
                "emoji": true
              },
              "value": [{"blueprint":"hr-survey","type":"update","value":"step2"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Disagree",
                "emoji": true
              },
              "value": [{"blueprint":"hr-survey","type":"update","value":"step2"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Fully disagree",
                "emoji": true
              },
              "style": "danger",
              "value": [{"blueprint":"hr-survey","type":"update","value":"step2"}]
            }
          ]
        },
        {
          "type": "divider"
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "Question 1 of 3"
            }
          ]
        }
      ]
    },
    step2: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Question 2*"
          },
          "accessory": {
            "type": "overflow",
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": ":back: Previous",
                  "emoji": true
                },
                "value": [{"blueprint":"hr-survey","type":"update","value":"step1"}]
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": ":x: Cancel",
                  "emoji": true
                },
                "value": "cancel"
              }
            ]
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "The atmosphere here is good."
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Fully agree",
                "emoji": true
              },
              "style": "primary",
              "value": [{"blueprint":"hr-survey","type":"update","value":"step3"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Agree",
                "emoji": true
              },
              "value": [{"blueprint":"hr-survey","type":"update","value":"step3"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Neutral",
                "emoji": true
              },
              "value": [{"blueprint":"hr-survey","type":"update","value":"step3"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Disagree",
                "emoji": true
              },
              "value": [{"blueprint":"hr-survey","type":"update","value":"step3"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Fully disagree",
                "emoji": true
              },
              "style": "danger",
              "value": [{"blueprint":"hr-survey","type":"update","value":"step3"}]
            }
          ]
        },
        {
          "type": "divider"
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "Question 2 of 3"
            }
          ]
        }
      ]
    },
    step3: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Question 3*"
          },
          "accessory": {
            "type": "overflow",
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": ":back: Previous",
                  "emoji": true
                },
                "value": [{"blueprint":"hr-survey","type":"update","value":"step1"}]
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": ":x: Cancel",
                  "emoji": true
                },
                "value": "cancel"
              }
            ]
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "I personally agree with the organization's values."
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Fully agree",
                "emoji": true
              },
              "style": "primary",
              "value": [{"blueprint":"hr-survey","type":"update","value":"step4"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Agree",
                "emoji": true
              },
              "value": [{"blueprint":"hr-survey","type":"update","value":"step4"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Neutral",
                "emoji": true
              },
              "value": [{"blueprint":"hr-survey","type":"update","value":"step4"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Disagree",
                "emoji": true
              },
              "value": [{"blueprint":"hr-survey","type":"update","value":"step4"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Fully disagree",
                "emoji": true
              },
              "style": "danger",
              "value": [{"blueprint":"hr-survey","type":"update","value":"step4"}]
            }
          ]
        },
        {
          "type": "divider"
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "Question 3 of 3"
            }
          ]
        }
      ]
    },
    step4: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Here are your answers, <fakeLink.toUser.com|David>:"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Question 1*\nThis job is a good fit for a person like me."
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select answer",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Fully agree",
                  "emoji": true
                },
                "value": "5"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Agree",
                  "emoji": true
                },
                "value": "4"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Neutral",
                  "emoji": true
                },
                "value": "3"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Disagree",
                  "emoji": true
                },
                "value": "2"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Fully disagree",
                  "emoji": true
                },
                "value": "1"
              }
            ],
            "initial_option": {
              "text": {
                "type": "plain_text",
                "text": "Fully agree",
                "emoji": true
              },
              "value": "5"
            }
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Question 2*\nThe atmosphere here is good."
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select answer",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Fully agree",
                  "emoji": true
                },
                "value": "5"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Agree",
                  "emoji": true
                },
                "value": "4"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Neutral",
                  "emoji": true
                },
                "value": "3"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Disagree",
                  "emoji": true
                },
                "value": "2"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Fully disagree",
                  "emoji": true
                },
                "value": "1"
              }
            ],
            "initial_option": {
              "text": {
                "type": "plain_text",
                "text": "Agree",
                "emoji": true
              },
              "value": "4"
            }
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Question 3*\nI personally agree with the organization's values."
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select answer",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Fully agree",
                  "emoji": true
                },
                "value": "5"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Agree",
                  "emoji": true
                },
                "value": "4"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Neutral",
                  "emoji": true
                },
                "value": "3"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Disagree",
                  "emoji": true
                },
                "value": "2"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Fully disagree",
                  "emoji": true
                },
                "value": "1"
              }
            ],
            "initial_option": {
              "text": {
                "type": "plain_text",
                "text": "Agree",
                "emoji": true
              },
              "value": "4"
            }
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Submit answers",
                "emoji": true
              },
              "style": "primary",
              "value": "5"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
              },
              "style": "danger",
              "value": "1"
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