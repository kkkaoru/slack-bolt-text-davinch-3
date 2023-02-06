const { App } = require("@slack/bolt");
const { trimMentions } = require('./trim');
const { fetchTextDavinci003, findChoicesText } = require('./openai');
const { appLog, errorLog } = require('./logger');
const { saveCache, searchCache, SlackCache } = require('./cache');

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
    const cacheFetchedData = searchCache(event.client_msg_id)?.fetched;
    const fetchedData = cacheFetchedData ?? (await fetchTextDavinci003(trimmedText));
    saveCache(event.client_msg_id, new SlackCache(fetchedData, false));
    appLog(fetchedData);
    appLog('finished fetch openai');
    const message = findChoicesText(fetchedData.choices);
    appLog('try say slack');
    const cacheSaid = searchCache(event.client_msg_id)?.said;
    if (cacheSaid === true) {
      appLog(`said ${event.client_msg_id}`);
      return;
    }
    await say(`<@${event.user}> ${message}`);
    saveCache(event.client_msg_id, new SlackCache(fetchedData, true));
    appLog('said slack');
  } catch (error) {
    errorLog(error);
    await say(`<@${event.user}> Error: ${error.toString()}`);
  }
});

app.command('/chatgpt', async ({ command, say, ack }) => {
  appLog(command);
  try {
    appLog('try ack');
    await ack({
      text: '',
      response_type: 'in_channel',
    });
    const trimmedText = trimMentions(command.text);
    appLog('try fetch openai');
    const cacheFetchedData = searchCache(command.trigger_id)?.fetched;
    const fetchedData = cacheFetchedData ?? await fetchTextDavinci003(trimmedText);
    appLog(fetchedData);
    appLog('finished fetch openai');
    const message = findChoicesText(fetchedData.choices);
    const cacheSaid = searchCache(command.trigger_id)?.said;
    if (cacheSaid === true) {
      appLog(`said ${command.trigger_id}`);
      return;
    }
    appLog('try say slack');
    await say(message);
    saveCache(command.trigger_id, new SlackCache(fetchedData, true));
    appLog('said slack');
  } catch (error) {
    errorLog(error);
    await say(`Error: ${error.toString()}`);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  appLog("⚡️ Bolt app is running!");
})();
