const { App } = require("@slack/bolt");
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});
// //メッセージが投稿された時に呼ばれるメソッド
// app.message(async ({ event, message, say }) => {
//   await say(`<@${event.user}> ${message.text}`);
// });
app.event('app_mention', async (event)=>{})
//アプリが起動時に呼ばれるメソッド
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();
