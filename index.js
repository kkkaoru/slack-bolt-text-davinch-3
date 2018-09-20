// Load environment variables from `.env` file (optional)
require('dotenv').config();

const slackEventsApi = require('@slack/events-api');
const SlackClient = require('@slack/client').WebClient;
const http = require('http');
const express = require('express');

// *** Initialize a client with your access token
const token = process.env.SLACK_ACCESS_TOKEN;
const slack = new SlackClient(token);


// *** Initialize event adapter using signing secret from environment variables ***
const slackEvents = slackEventsApi.createEventAdapter(process.env.SLACK_SIGNING_SECRET, {
  includeBody: true
});


// Helpers to cache and lookup appropriate client
// NOTE: Not enterprise-ready. if the event was triggered inside a shared channel, this lookup
// could fail but there might be a suitable client from one of the other teams that is within that
// shared channel.
// const clients = {};
// function getClientByTeamId(teamId) {
//   if (!clients[teamId] && botAuthorizations[teamId]) {
//     clients[teamId] = new SlackClient(botAuthorizations[teamId]);
//   }
//   if (clients[teamId]) {
//     return clients[teamId];
//   }
//   return null;
// }

// Initialize an Express application
const app = express();


// *** Plug the event adapter into the express app as middleware ***
app.use('/slack/events', slackEvents.expressMiddleware());

// *** Attach listeners to the event adapter ***

// *** Greeting any user that says "hi" ***
slackEvents.on('message', (message, body) => {
  console.log(message);
  // Only deal with messages that have no subtype (plain messages) and contain 'hi'
  if (!message.subtype && message.text.indexOf('hi') >= 0) {
    
    // Respond to the message back in the same channel
    slack.chat.postMessage({ channel: message.channel, text: `Hello <@${message.user}>! :tada:` })
      .catch(console.error);
  }
});

// *** Responding to reactions with the same emoji ***
slackEvents.on('reaction_added', (event, body) => {

  // Respond to the reaction back with the same emoji
  slack.chat.postMessage(event.item.channel, `:${event.reaction}:`)
    .catch(console.error);
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
http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});
