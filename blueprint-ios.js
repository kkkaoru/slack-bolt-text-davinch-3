module.exports = {
  // this defines the start flow
  start: [{"blueprint":"ios","type":"message","value":"demo"}],
  // definitions of dialogs
  dialog: {
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
            "text": "Click the button :point_down:"
          }
        },
        {
          "block_id": "eJyrViopSswrTkwuyczPc0ksSVWyUjIyMLTUNTDRNTQPMTCwAiMlHaXUioLUvOLUkMqCVM8UoCoff+cAD6B4cmlRUWpecqVzfgpIc2iwC1AQyVDH3PzSvBJdoJQpUKIsNS8lv0jJKq80JweLMiUrUx2lotTk1MyCErAtSrUAJ1M0AQ==",
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Trigger message reply"
              },
              "value": [{"blueprint":"ios","type":"thread","value":"demo"}]
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
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Update message"
              },
              "value": [{"blueprint":"ios","type":"update","value":"demo"}]
            }
          ]
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
        }
      ]
    }
  }
}