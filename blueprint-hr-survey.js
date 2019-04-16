module.exports = {
  start: [{"blueprint":"hr-survey","type":"message","value":"start"}],
  dialog: {},
  ephemeral: {},
  message: {
    start : {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Hi <fakeLink.toUser.com|David>!\n\nOur Q1 Pulse Survey launches today. Please take a few minutes to give your honest opinion on how things are going.\n\nYou have until Friday, April 19 to respond. Thank you!"
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Start survey",
                "emoji": true
              },
              "style": "primary",
              "value": [{"blueprint":"hr-survey","type":"update","value":"step1"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": ":alarm_clock: Remind me later",
                "emoji": true
              },
              "value": "remind"
            }
          ]
        }
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
                "value": [{"blueprint":"hr-survey","type":"update","value":"step2"}]
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
                "value": "1:5"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Agree",
                  "emoji": true
                },
                "value": "1:4"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Neutral",
                  "emoji": true
                },
                "value": "1:3"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Disagree",
                  "emoji": true
                },
                "value": "1:2"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Fully disagree",
                  "emoji": true
                },
                "value": "1:1"
              }
            ],
            "initial_option": {
              "text": {
                "type": "plain_text",
                "text": "Fully agree",
                "emoji": true
              },
              "value": "1:5"
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
                "value": "2:5"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Agree",
                  "emoji": true
                },
                "value": "2:4"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Neutral",
                  "emoji": true
                },
                "value": "2:3"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Disagree",
                  "emoji": true
                },
                "value": "2:2"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Fully disagree",
                  "emoji": true
                },
                "value": "2:1"
              }
            ],
            "initial_option": {
              "text": {
                "type": "plain_text",
                "text": "Agree",
                "emoji": true
              },
              "value": "2:4"
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
                "value": "3:5"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Agree",
                  "emoji": true
                },
                "value": "3:4"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Neutral",
                  "emoji": true
                },
                "value": "3:3"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Disagree",
                  "emoji": true
                },
                "value": "3:2"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Fully disagree",
                  "emoji": true
                },
                "value": "3:1"
              }
            ],
            "initial_option": {
              "text": {
                "type": "plain_text",
                "text": "Agree",
                "emoji": true
              },
              "value": "3:4"
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
              "value": [{"blueprint":"hr-survey","type":"update","value":"confirmation"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
              },
              "style": "danger",
              "value": "cancel"
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
            "text": "*Thank you, <fakeLink.toUser.com|David>!*"
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
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "*Answer:* Fully agree"
            }
          ]
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Question 2*\nThe atmosphere here is good."
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "*Answer:* Agree"
            }
          ]
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Question 3*\nI personally agree with the organization's values."
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "*Answer:* Agree"
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
              "text": ":white_check_mark: You submitted this survey on 03/14/2019 at 03:45pm"
            }
          ]
        }
      ]
    }
  }
}