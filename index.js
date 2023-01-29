const { App } = require("@slack/bolt");
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});
//メッセージが投稿された時に呼ばれるメソッド
app.message(async ({ message, say }) => {
  console.log('message log start');
  console.log(message);
  await say(message.text);
  console.log('message log end');
});

app.event('app_mention', async ({ event, context, client, say }) => {
  console.log('mention log start');
  console.log(event);
  console.log('--');
  console.log(context);
  console.log('--');
  console.log(client)
  console.log('mention log end');
  try {
    await say({"blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Thanks for the mention <@${event.user}>! Here's a button`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
          },
          "value": "click_me_123",
          "action_id": "first_button"
        }
      }
    ]});
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
