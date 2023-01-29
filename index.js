const { App } = require("@slack/bolt");
const { trimMentions } = require('./trim');
const { fetchTextDavinci003, findChoicesText } = require('./openai');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.event('app_mention', async ({ event, context, client, say }) => {
  const message = trimMentions(event.text);
  try {
    const response = await fetchTextDavinci003(message);
    const message = 
    await say(`<@${event.user}> ${message}`);
  }
  catch (error) {
    console.error(error);
    await say(`<@${event.user}> Error: ${error.toString()}`);
  }
});

//アプリが起動時に呼ばれるメソッド
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
