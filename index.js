const { App } = require("@slack/bolt");
const { trimMentions } = require('./trim');
const { fetchTextDavinci003, findChoicesText } = require('./openai');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

// 
app.event('app_mention', async ({ event, context, client, say }) => {
  const trimedText = trimMentions(event.text);
  try {
    const fetchedData = await fetchTextDavinci003(trimedText);
    console.log(fetchedData);
    const message = findChoicesText(fetchedData.choices);
    await say(`<@${event.user}> ${message}`);
  }
  catch (error) {
    console.error(error);
    await say(`<@${event.user}> Error: ${error.toString()}`);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
