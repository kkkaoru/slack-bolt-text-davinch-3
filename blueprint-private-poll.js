module.exports = {
  dialog: {},
  ephemeral: {},
  message: {
    start: {
      channel: "DGGD1E5RA",
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Hello David! <fakeLink.toUser.com|Michael> wants to know where you'd like to take the Paper Company investors to dinner tonight.\n\n *Please select a restaurant:*"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Farmhouse Thai Cuisine*\n:star::star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here."
          },
          "accessory": {
            "type": "image",
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg",
            "alt_text": "alt text for image"
          }
        },
          {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Choose Farmhouse",
                "emoji": true
              },
              "value": "click_me_123"
            }
          ]
        },
          {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Kin Khao*\n:star::star::star::star: 1638 reviews\n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft."
          },
          "accessory": {
            "type": "image",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/korel-1YjNtFtJlMTaC26A/o.jpg",
            "alt_text": "alt text for image"
          }
        },
          {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Choose Kin Khao",
                "emoji": true
              },
              "value": "click_me_123"
            }
          ]
        },
          {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Ler Ros*\n:star::star::star::star: 2082 reviews\n I would really recommend the Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder."
          },
          "accessory": {
            "type": "image",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/DawwNigKJ2ckPeDeDM7jAg/o.jpg",
            "alt_text": "alt text for image"
          }
        },
          {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Choose Le Ros",
                "emoji": true
              },
              "value": "click_me_123"
            }
          ]
        },
        {
          "type": "divider"
        }
      ]
    }
  },
  thread: {},
  update: {
    select1: {
      blocks: []
    }
  }
}