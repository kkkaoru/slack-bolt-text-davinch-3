const { App } = require("@slack/bolt");
const { trimMentions } = require('./trim');
const { fetchTextDavinci003, findChoicesText } = require('./openai');
const { appLog, errorLog } = require('./logger');
const { generateCacheKey, saveCache, searchCache, SlackCache } = require('./cache');

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
    const cacheKey = generateCacheKey(trimmedText);
    const cacheFetchedData = searchCache(cacheKey)?.fetched;
    const fetchedData = cacheFetchedData ?? (await fetchTextDavinci003(trimmedText));
    saveCache(cacheKey, new SlackCache(fetchedData, false));
    appLog(fetchedData);
    appLog('finished fetch openai');
    const message = findChoicesText(fetchedData.choices);
    appLog('try say slack');
    const cacheSaid = searchCache(cacheKey)?.said;
    if (cacheSaid === true) {
      appLog(`said ${cacheKey}`);
      return;
    }
    await say(`<@${event.user}> ${message}`);
    saveCache(cacheKey, new SlackCache(fetchedData, true));
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
    const cacheKey = generateCacheKey(trimmedText);
    appLog('try fetch openai');
    const cacheFetchedData = searchCache(cacheKey)?.fetched;
    const fetchedData = cacheFetchedData ?? await fetchTextDavinci003(trimmedText);
    appLog(fetchedData);
    appLog('finished fetch openai');
    const message = findChoicesText(fetchedData.choices);
    const cacheSaid = searchCache(cacheKey)?.said;
    if (cacheSaid === true) {
      appLog(`said ${cacheKey}`);
      return;
    }
    appLog('try say slack');
    await say(message);
    saveCache(cacheKey, new SlackCache(fetchedData, true));
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
