const slackEventsApi = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const SlackClient = require('@slack/client').WebClient;
const express = require('express');

const app = express();
const slackUser = new SlackClient(process.env.SLACK_USER_TOKEN);
const slackBot = new SlackClient(process.env.SLACK_ACCESS_TOKEN);
const slackEvents = slackEventsApi.createEventAdapter(process.env.SLACK_SIGNING_SECRET);
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

const blocks = require('./blocks')

app.use('/slack/onEvent', slackEvents.expressMiddleware());
app.use('/slack/onAction', slackInteractions.expressMiddleware());

// this starts the flow with
app.get('/start/:flow', (req, res) => {
  let flow = req.params.flow
  console.log(req.params.flow)
  
  slackBot.chat.postMessage({
      channel: blocks.approvalNotice.channel.dm,
      blocks: blocks.approvalNotice.message.request
  })
  return res.send('starting interactive demo: '+flow)
})

slackInteractions.action({ type: 'button' }, (payload, respond) => {
  let action = JSON.parse(payload.actions[0].value)
  
  console.log(action) 
  
  switch(action.type) {
    case 'message':
      return respond({
        blocks: blocks[action.blueprint][action.value]
      })
    case 'dialog':  
      return slackBot.dialog.open({
        
      })
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
