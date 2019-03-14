module.exports = {
  dialog: {},
  ephemeral: {},
  message: {
    start: {
      channel: "DGGD1E5RA",
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Where should we order lunch from?* Poll by <fakeLink.toUser.com|Mark>"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":sushi: *Ace Wasabi Rock-n-Roll Sushi Bar*\nThe best landlocked sushi restaurant."
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "emoji": true,
              "text": "Vote"
            },
            "value": "poll:sushi"
          }
        },
          {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "No votes"
            }
          ]
        },
          {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":hamburger: *Super Hungryman Hamburgers*\nOnly for the hungriest of the hungry."
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "emoji": true,
              "text": "Vote"
            },
            "value": "poll:hamburger"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "No votes"
            }
          ]
        },
          {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":ramen: *Kagawa-Ya Udon Noodle Shop*\nDo you like to shop for noodles? We have noodles."
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "emoji": true,
              "text": "Vote"
            },
            "value": "poll:ramen"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "No votes"
            }
          ]
        },
        {
          "type": "divider"
        }
      ]
    }
  },
  thread: {},
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