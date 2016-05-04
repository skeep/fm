var bill = {
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "generic",
      "elements": [
        {
          "title": "Classic White T-Shirt",
          "image_url": "http://petersapparel.parseapp.com/img/item100-thumb.png",
          "subtitle": "Soft white cotton t-shirt is back in style",
          "buttons": [
            {
              "type": "web_url",
              "url": "https://petersapparel.parseapp.com/view_item?item_id=100",
              "title": "View Item"
            },
            {
              "type": "web_url",
              "url": "https://petersapparel.parseapp.com/buy_item?item_id=100",
              "title": "Buy Item"
            },
            {
              "type": "postback",
              "title": "Bookmark Item",
              "payload": "USER_DEFINED_PAYLOAD_FOR_ITEM100"
            }
          ]
        },
        {
          "title": "Classic Grey T-Shirt",
          "image_url": "http://petersapparel.parseapp.com/img/item101-thumb.png",
          "subtitle": "Soft gray cotton t-shirt is back in style",
          "buttons": [
            {
              "type": "web_url",
              "url": "https://petersapparel.parseapp.com/view_item?item_id=101",
              "title": "View Item"
            },
            {
              "type": "web_url",
              "url": "https://petersapparel.parseapp.com/buy_item?item_id=101",
              "title": "Buy Item"
            },
            {
              "type": "postback",
              "title": "Bookmark Item",
              "payload": "USER_DEFINED_PAYLOAD_FOR_ITEM101"
            }
          ]
        }
      ]
    }
  }
};
