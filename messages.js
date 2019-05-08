module.exports = {
  welcome_app_home: {
    text: 'Hi there! Bolt is a simple App that forwards messages to another channel by reacting to a message with the :zap: emoji.',
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Hi there! \n\n Bolt is a simple App that forwards messages to another channel by reacting to a message with the :zap: emoji. \n\n But before we start, let's configure a channel you want all messages to be forwarded to. \n\n"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Pick a channel from the dropdown list*"
        },
        "accessory": {
          "type": "channels_select",
          "placeholder": {
            "type": "plain_text",
            "text": "Select channel",
            "emoji": true
          }
        }
      }
    ]
  }  
}