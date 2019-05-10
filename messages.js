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
      }
    ]
  },
  welcome_channel: {
    text: 'Hi there! Bolt is a simple App that forwards messages to another channel by reacting to a message with the :zap: emoji.',
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Hi there! \n\n Bolt is a simple App that forwards messages from this channel to {{channel}} by reacting to a message with the :zap: emoji."
        }
      }
    ]
  },  
  invited_to_channel: {
    text: 'Bolt has been invited to channel',
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":white_check_mark: Bolt has been invited to {{channel}}"
        }
      },
      {
        "type": "divider"
      }
    ]
  }  
}