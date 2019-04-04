module.exports = {
  dialog: {
    create: {
      "callback_id": "dialog:1",
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
          "value": "This is a prefilled text \n\n https://pony-farm.slack.com/archives/DH46T0QV6/p1553819686001000"
        }
      ],
      "state": [{"blueprint":"createTask","type":"thread","value":"confirmation","fill_values":["message.ts"]}]
    }
  },
  ephemeral: {},
  message: {},
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
            "value": "click_me_123"
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
            "text": "*Description*\nCan you please prepare the deck for our customer meeting tomorrow, <fakeLink.toUser.com|David>?\n\nhttps://pony-farm.slack.com/archives/DH46T0QV6/p1553819686001000"
          }
        }
      ]
    }
  },
  update: {}
}