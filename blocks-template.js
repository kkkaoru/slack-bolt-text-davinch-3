module.exports = {
  dialog: {
    demo: {
      "callback_id": "dialog:1",
      "title": "This is a demo dialog",
      "elements": [
        {
          "type": "text",
          "label": "Enter some data",
          "name": "loc_origin"
        }
      ]
    }
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
    test: {
      channel: "DGGD1E5RA",
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Click one of these buttons to start a flow :point_down:"
          }
        }
      ]
    },
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
              "value": {"blueprint":"template","type":"message","value":"demo"}
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger message reply"
              },
              "value": {"blueprint":"template","type":"thread","value":"demo"}
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger ephemeral message"
              },
              "value": {"blueprint":"template","type":"ephemeral","value":"demo"}
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Update message"
              },
              "value": {"blueprint":"template","type":"update","value":"demo"}
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Open dialog"
              },
              "value": {"blueprint":"template","type":"dialog","value":"demo"}
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
              "value": {"blueprint":"template","type":"message","value":"demo"}
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger message reply"
              },
              "value": {"blueprint":"template","type":"thread","value":"demo"}
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger ephemeral message"
              },
              "value": {"blueprint":"template","type":"ephemeral","value":"demo"}
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Open dialog"
              },
              "value": {"blueprint":"template","type":"dialog","value":"demo"}
            }
          ]
        }
      ]
    }
  }
}