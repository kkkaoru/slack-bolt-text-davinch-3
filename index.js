const { App } = require("@slack/bolt");
const { trimMentions } = require('./trim');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.event('app_mention', async ({ event, context, client, say }) => {
  const message = trimMentions(event.text);
  try {
    await say(`<@${event.user}> ${message}`);
  }
  catch (error) {
    console.error(error);
  }
});

//アプリが起動時に呼ばれるメソッド
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
