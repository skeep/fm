var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

var postbacks = require('./postbakcs.js');

var token = "EAAMdMrzztUMBAIHGRHpttv7BadmCY96ZAcHnXdDiwRIKKDZCpnWqpShneEM0sP6avJA7AhlZBGGInxt3ZCMIhduaFBRj6VmcQSiKF5e4XFJeaKiFA95GMH04t6TaEBlax1cyBDP621r5ITjmJuZCKTyyD2sTtpkBJxcRpy2JwhgZDZD";

var dispatchRequest = function (message, sender) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: message,
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
};

function sendTextMessage(sender, text) {
  var messageData = {
    text: text
  };
  dispatchRequest(messageData, sender);
}

function sendOption(sender) {
  var messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Bill detail for May 2016",
            "image_url": "http://petersapparel.parseapp.com/img/item100-thumb.png",
            "subtitle": "You don't have any bill due. Next bill generation date is 4-April-16",
            "buttons": [
              {
                "type": "web_url",
                "url": "https://www.google.com",
                "title": "Bill details"
              }, {
                "type": "postback",
                "title": "Activate/ Deactivate service",
                "payload": "services"
              }, {
                "type": "postback",
                "title": "More options ...",
                "payload": "more..."
              }
            ]
          }
        ]
      }
    }
  };
  dispatchRequest(messageData, sender);
}

app.set('port', (process.env.PORT || 5000));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    console.log(event.sender);
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      switch (text) {
        case 'hi':
          sendOption(sender);
          break;
        default:
          sendTextMessage(sender, text.substring(0, 200));
      }
    } else if (event.postback) {
      var action = event.postback.payload;
      postbacks[action](sender);
      continue;
    }
  }
  res.sendStatus(200);
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
