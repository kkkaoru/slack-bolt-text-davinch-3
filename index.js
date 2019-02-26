const slackEventsApi = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const SlackClient = require('@slack/client').WebClient;
const express = require('express');

const app = express();
const slack = new SlackClient(process.env.SLACK_ACCESS_TOKEN);
const slackEvents = slackEventsApi.createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

const blocks = require('./blocks')

app.use('/slack/onEvent', slackEvents.expressMiddleware());
app.use('/slack/onAction', slackInteractions.expressMiddleware());

app.get('/start/approval-notice', (req, res) => {
  slack.chat.postMessage({
      channel: 'DGGD1E5RA',
      blocks: blocks.approvalNotice.request
  })
  return res.send('started')
})

slackInteractions.action({ type: 'button' }, (action, respond) => {
  console.log(action)
  return respond({
    blocks: blocks.approvalNotice.confirmation
  });
});

slackEvents.on('app_mention', (message) => {
  console.log(message);
  // Only deal with messages that have no subtype (plain messages) and contain 'hi'
  let threadId
  if (!message.subtype && /hi/i.test(message.text)) {
    if(message.thread_ts) {
      threadId = message.thread_ts
    }
    // Respond to the message back in the same channel
    slack.chat.postMessage({ channel: message.channel, text: `Hello <@${message.user}>! :tada:`, thread_ts: threadId })
      .catch(console.error);
  }
});


// *** Handle errors ***
slackEvents.on('error', (error) => {
  if (error.code === slackEventsApi.errorCodes.TOKEN_VERIFICATION_FAILURE) {
    // This error type also has a `body` propery containing the request body which failed verification.
    console.error(`An unverified request was sent to the Slack events Request URL. Request body: \
${JSON.stringify(error.body)}`);
  } else {
    console.error(`An error occurred while handling a Slack event: ${error.message}`);
  }
});

// Start the express application
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
