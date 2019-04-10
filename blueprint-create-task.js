module.exports = {
  start: [{"blueprint":"create-task","type":"message","value":"task"}],
  dialog: {
    create: {
      "callback_id": "dialog_task",
      "title": "Create a task",
      "elements": [
        {
          "type": "text",
          "label": "Summary",
          "name": "summary"
        },
        {
          "label": "Assignee",
          "name": "assignee",
          "type": "select",
          "data_source": "users",
          "optional": true
        },
        {
          "label": "Priority",
          "type": "select",
          "name": "priority",
          "options": [
            {
              "label": ":no_entry_sign: Critical",
              "value": "critical"
            },
            {
              "label": ":arrow_double_up: High",
              "value": "high"
            },
            {
              "label": ":arrow_up_small: Medium",
              "value": "medium"
            },
            {
              "label": ":arrow_down_small: Low",
              "value": "low"
            } 
          ],
          "optional": true
        },
        {
          "label": "Label",
          "name": "label",
          "type": "select",
          "data_source": "external",
          "optional": true
        },
        {
          "type": "textarea",
          "label": "Description",
          "name": "description",
          "value": "Can you please prepare the deck for our customer meeting tomorrow, David?\n\nhttps://workspace.slack.com/archives/CXXXXXXX/p1553819686001000"
        }
      ],
      "state": [{"blueprint":"create-task","type":"thread","value":"confirmation","fill_values":["message.ts"]}]
    }
  },
  ephemeral: {},
  message: {
    task: {
      icon_url: "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
      username: "Pam",
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Can you please prepare the deck for our customer meeting tomorrow, <fakeLink.toUser.com|David>?"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "(Click \"Create Task\" message action to create a task)"
            }
          ]
        }
      ]
    }
  },
  thread: {
    confirmation: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Your task *Prepare customer deck* has been created :ok_hand:"
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "View :arrow_upper_right:",
              "emoji": true
            },
            "url": "https://example.com"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "*Assignee:* <fakeLink.toUser.com|David>"
            },
            {
              "type": "mrkdwn",
              "text": "*Priority:* :arrow_double_up: High"
            },
            {
              "type": "mrkdwn",
              "text": "*Labels:* Sales"
            }
          ]
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Description*\nCan you please prepare the deck for our customer meeting tomorrow, <fakeLink.toUser.com|David>?\n\nhttps://workspace.slack.com/archives/CXXXXXXX/p1553819686001000"
          }
        }
      ]
    }
  },
  update: {}
}