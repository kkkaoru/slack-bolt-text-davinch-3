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
          "type": "textarea",
          "label": "Description",
          "name": "description"
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
            "text": "Your task has been created :ok_hand:"
          }
        }
      ]
    }
  },
  update: {}
}