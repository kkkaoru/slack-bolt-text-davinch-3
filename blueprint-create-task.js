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
      "state": [{"blueprint":"createTask","type":"thread","value":"confirmation"}],
      "fill_values": ["message.ts"],
      "prefill": {
        "message.ts": ""
      }
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