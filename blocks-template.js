module.exports = {
  dialog: {
  },
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
    }
  },
  message: {
    demo: {
      channel: "DGGD1E5RA",
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
                "text": "Trigger message"
              },
              "value": "{\"blueprint\":\"template\",\"type\":\"message\",\"value\":\"demo\"}"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger message reply"
              },
              "value": "{\"blueprint\":\"template\",\"type\":\"thread\",\"value\":\"demo\"}"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger ephemeral message"
              },
              "value": "{\"blueprint\":\"template\",\"type\":\"ephemeral\",\"value\":\"demo\"}"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Update message"
              },
              "value": "{\"blueprint\":\"template\",\"type\":\"update\",\"value\":\"demo\"}"
            }
          ]
        }
      ]
    }
  },
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
    }
  },
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
              "value": "{\"blueprint\":\"template\",\"type\":\"message\",\"value\":\"demo\"}"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger message reply"
              },
              "value": "{\"blueprint\":\"template\",\"type\":\"thread\",\"value\":\"demo\"}"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger ephemeral message"
              },
              "value": "{\"blueprint\":\"template\",\"type\":\"ephemeral\",\"value\":\"demo\"}"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Update message"
              },
              "value": "{\"blueprint\":\"template\",\"type\":\"update\",\"value\":\"demo\"}"
            }
          ]
        }
      ]
    }
  }
}