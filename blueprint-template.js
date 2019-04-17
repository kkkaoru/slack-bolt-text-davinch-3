module.exports = {
  // this defines the start flow
  start: [{"blueprint":"template","type":"message","value":"demo"}],
  // definitions of dialogs
  dialog: {
    demo: {
      "callback_id": "dialog:1",
      "title": "This is a demo dialog",
      "elements": [
        {
          "type": "text",
          "label": "Enter some data",
          "name": "some_data"
        }
      ],
      "state": [{"blueprint":"template","type":"thread","value":"confirmation","fill_values":["message.ts"]}]
    }
  },
  // definitions of ephemeral messages
  ephemeral: {
    demo: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "This is an ephemeral message :lock:"
          }
        }
      ]
    },
    slash: {
      channel: "DGGD1E5RA",
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "No blueprint found with this name."
          }
        }
      ]
    }
  },
  // definitions of standard messages
  message: {
    demo: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Click one of these buttons to start a flow :point_down:"
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger messages"
              },
              "value": [{"blueprint":"template","type":"message","value":"demo"},{"blueprint":"template","type":"message","value":"demo","delay":1000}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger message reply"
              },
              "value": [{"blueprint":"template","type":"thread","value":"demo"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger ephemeral message"
              },
              "value": [{"blueprint":"template","type":"ephemeral","value":"demo"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Update message"
              },
              "value": [{"blueprint":"template","type":"update","value":"demo"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Open dialog"
              },
              "value": [{"blueprint":"template","type":"dialog","value":"demo"}]
            },
            {
              "type": "static_select",
              "placeholder": {
                "type": "plain_text",
                "text": "Select an item",
                "emoji": true
              },
              "options": [
                {
                  "text": {
                    "type": "plain_text",
                    "text": "Send message",
                    "emoji": true
                  },
                  "value": [{"blueprint":"template","type":"message","value":"demo"}]
                },
                {
                  "text": {
                    "type": "plain_text",
                    "text": "Send ephemeral",
                    "emoji": true
                  },
                  "value": [{"blueprint":"template","type":"ephemeral","value":"demo"}]
                },
                {
                  "text": {
                    "type": "plain_text",
                    "text": "Send message reply",
                    "emoji": true
                  },
                  "value": [{"blueprint":"template","type":"thread","value":"demo"}]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  // definitions of message replies / thread messages
  thread: {
    demo: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "This is a reply to a message :tada:"
          }
        }
      ]
    },
    confirmation: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Your dialog has been submitted :ok_hand:"
          }
        }
      ]
    }
  },
  // definitions of messages which should update
  update: {
    demo: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "You updated this message. Great :clap: job :clap:"
          }
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger message"
              },
              "value": [{"blueprint":"template","type":"message","value":"demo"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger message reply"
              },
              "value": [{"blueprint":"template","type":"thread","value":"demo"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger ephemeral message"
              },
              "value": [{"blueprint":"template","type":"ephemeral","value":"demo"}]
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Open dialog"
              },
              "value": [{"blueprint":"template","type":"dialog","value":"demo"}]
            }
          ]
        }
      ]
    }
  }
}