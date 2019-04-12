module.exports = {
  start: [{"blueprint":"search","type":"message","value":"dates"}],
  dialog: {},
  ephemeral: {},
  message: {
    dates: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Searching hotels in"
          },
          "accessory": {
            "type": "external_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Enter location",
              "emoji": true
            },
            "initial_option": {
              "text": {
                "type": "plain_text",
                "text": "Los Angeles"
              },
              "value": "los_angeles"
            }
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*From*"
          },
          "accessory": {
            "type": "datepicker",
            "placeholder": {
              "type": "plain_text",
              "text": "Select date"
            }
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*To*"
          },
          "accessory": {
            "type": "datepicker",
            "placeholder": {
              "type": "plain_text",
              "text": "Select date"
            }
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Search hotels",
                "emoji": true
              },
              "style": "primary",
              "value": "search"
            }
          ]
        }
      ]
    }
  },
  thread: {},
  update: {
    editSearch: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Update your search:*"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Select your location"
          },
          "accessory": {
            "type": "external_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Enter location",
              "emoji": true
            }
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Select your *start date*"
          },
          "accessory": {
            "type": "datepicker",
            "placeholder": {
              "type": "plain_text",
              "text": "Select date"
            }
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Select your *end date*"
          },
          "accessory": {
            "type": "datepicker",
            "placeholder": {
              "type": "plain_text",
              "text": "Select date"
            }
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Update",
                "emoji": true
              },
              "value": [{"blueprint":"search","type":"update","value":"result_edit"}]
            }
          ]
        }
      ]
    },
    result_edit: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "We found *3 Hotels* in Los Angeles from *12/14 to 12/17*"
          },
          "accessory": {
            "type": "overflow",
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "emoji": true,
                  "text": ":mag: Edit search"
                },
                "value": [{"blueprint":"search","type":"update","value":"editSearch"}]
              },
              {
                "text": {
                  "type": "plain_text",
                  "emoji": true,
                  "text": ":pencil2: Edit filters"
                },
                "value": [{"blueprint":"search","type":"ephemeral","value":"editDates"}]
              }
            ]
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*<fakeLink.toHotelPage.com|Five Points>*\n★★★★★\n$340 per night\nRated: 9.4 - Excellent"
          },
          "accessory": {
            "type": "image",
            "image_url": "https://images.unsplash.com/photo-1525905708812-b271b5e3b2f3",
            "alt_text": "Five Points thumbnail"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "image",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
              "alt_text": "Location Pin Icon"
            },
            {
              "type": "plain_text",
              "emoji": true,
              "text": "Location: Central Business District"
            }
          ]
        },
          {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Book now"
              },
              "style": "primary",
              "value": "click_me_123"
            },
                  {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "See available rooms"
              },
              "value": "click_me_123"
            },
            {
                "type": "overflow",
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "View gallery",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Show on map",
                            "emoji": true
                        },
                        "value": "value-1"
                    }
                ]
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
            "text": "*<fakeLink.toHotelPage.com|Venice Beach Hotel>*\n★★★★★\n$340 per night\nRated: 9.1 - Excellent"
          },
          "accessory": {
            "type": "image",
            "image_url": "https://images.unsplash.com/photo-1549638441-b787d2e11f14",
            "alt_text": "Venice Beach Hotel thumbnail"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "image",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
              "alt_text": "Location Pin Icon"
            },
            {
              "type": "plain_text",
              "emoji": true,
              "text": "Location: Venice Beach"
            }
          ]
        },
          {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Book now"
              },
              "style": "primary",
              "value": "click_me_123"
            },
                  {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "See available rooms"
              },
              "value": "click_me_123"
            },
            {
                "type": "overflow",
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "View gallery",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Show on map",
                            "emoji": true
                        },
                        "value": "value-1"
                    }
                ]
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
            "text": "*<fakeLink.toHotelPage.com|Central Inn>*\n★★★★★\n$419 per night\nRated: 8.8 - Excellent"
          },
          "accessory": {
            "type": "image",
            "image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882",
            "alt_text": "Central Inn thumbnail"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "image",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
              "alt_text": "Location Pin Icon"
            },
            {
              "type": "plain_text",
              "emoji": true,
              "text": "Location: Downtown LA"
            }
          ]
        },
          {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Book now"
              },
              "style": "primary",
              "value": "click_me_123"
            },
                  {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "See available rooms"
              },
              "value": "click_me_123"
            },
            {
                "type": "overflow",
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "View gallery",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Show on map",
                            "emoji": true
                        },
                        "value": "value-1"
                    }
                ]
            }
          ]
        },
        {
          "type": "divider"
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "plain_text",
              "emoji": true,
              "text": "Results 1-3 of 3"
            }
          ]
        }
      ]
    },
    result: {
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "We found *8 Hotels* in Los Angeles from *12/14 to 12/17*"
          },
          "accessory": {
            "type": "overflow",
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "emoji": true,
                  "text": ":mag: Edit search"
                },
                "value": [{"blueprint":"search","type":"update","value":"editSearch"}]
              },
              {
                "text": {
                  "type": "plain_text",
                  "emoji": true,
                  "text": ":pencil2: Edit filters"
                },
                "value": [{"blueprint":"search","type":"ephemeral","value":"editDates"}]
              }
            ]
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*<fakeLink.toHotelPage.com|Windsor Court Hotel>*\n★★★★★\n$340 per night\nRated: 9.4 - Excellent"
          },
          "accessory": {
            "type": "image",
            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_1.png",
            "alt_text": "Windsor Court Hotel thumbnail"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "image",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
              "alt_text": "Location Pin Icon"
            },
            {
              "type": "plain_text",
              "emoji": true,
              "text": "Location: Central Business District"
            }
          ]
        },
          {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Book now"
              },
              "style": "primary",
              "value": "click_me_123"
            },
                  {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "See available rooms"
              },
              "value": "click_me_123"
            },
            {
                "type": "overflow",
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "View gallery",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Show on map",
                            "emoji": true
                        },
                        "value": "value-1"
                    }
                ]
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
            "text": "*<fakeLink.toHotelPage.com|The Ritz-Carlton Los Angeles>*\n★★★★★\n$340 per night\nRated: 9.1 - Excellent"
          },
          "accessory": {
            "type": "image",
            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_2.png",
            "alt_text": "Ritz-Carlton Los Angeles thumbnail"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "image",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
              "alt_text": "Location Pin Icon"
            },
            {
              "type": "plain_text",
              "emoji": true,
              "text": "Location: French Quarter"
            }
          ]
        },
          {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Book now"
              },
              "style": "primary",
              "value": "click_me_123"
            },
                  {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "See available rooms"
              },
              "value": "click_me_123"
            },
            {
                "type": "overflow",
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "View gallery",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Show on map",
                            "emoji": true
                        },
                        "value": "value-1"
                    }
                ]
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
            "text": "*<fakeLink.toHotelPage.com|Omni Royal Orleans Hotel>*\n★★★★★\n$419 per night\nRated: 8.8 - Excellent"
          },
          "accessory": {
            "type": "image",
            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_3.png",
            "alt_text": "Omni Royal Orleans Hotel thumbnail"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "image",
              "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
              "alt_text": "Location Pin Icon"
            },
            {
              "type": "plain_text",
              "emoji": true,
              "text": "Location: French Quarter"
            }
          ]
        },
          {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Book now"
              },
              "style": "primary",
              "value": "click_me_123"
            },
                  {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "See available rooms"
              },
              "value": "click_me_123"
            },
            {
                "type": "overflow",
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "View gallery",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Show on map",
                            "emoji": true
                        },
                        "value": "value-1"
                    }
                ]
            }
          ]
        },
        {
          "type": "divider"
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "plain_text",
              "emoji": true,
              "text": "Results 1-3 of 8"
            }
          ]
        },
        {
          "type": "actions",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Next >"
              },
              "value": [{"blueprint":"search","type":"update","value":"result_1"}]
            }
          ]
        }
      ]
    }
  }
}