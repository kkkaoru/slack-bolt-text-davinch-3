const { App } = require("@slack/bolt");
const { trimMentions } = require('./trim');
const { fetchTextDavinci003, findChoicesText } = require('./openai');
const { appLog, errorLog } = require('./logger');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

// Require app_mentions:read
app.event('app_mention', async ({ event, say }) => {
  appLog(event);
  const trimmedText = trimMentions(event.text);
  try {
    appLog('try fetch openai');
    const fetchedData = await fetchTextDavinci003(trimmedText);
    appLog(fetchedData);
    appLog('finished fetch openai');
    const message = findChoicesText(fetchedData.choices);
    appLog('try say slack');
    await say(`<@${event.user}> ${message}`);
    appLog('said slack');
  }
  catch (error) {
    errorLog(error);
    await say(`<@${event.user}> Error: ${error.toString()}`);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  appLog("⚡️ Bolt app is running!");
})();
