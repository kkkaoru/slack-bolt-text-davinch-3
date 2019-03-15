module.exports = {
  dialog: {
    create: {
      "callback_id": "dialog:1",
      "title": "Create a task",
      "elements": [
        {
          "type": "text",
          "label": "Enter some data",
          "name": "some_data"
        }
      ],
      "state": [{"blueprint":"createTask","type":"ephemeral","value":"confirmation"}],
      "fill_options": ["message.ts"]
    }
  },
  ephemeral: {
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
  message: {},
  thread: {},
  update: {}
}