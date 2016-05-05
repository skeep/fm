var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  request = require('request'),
  https = require('https'),
  _ = require('lodash');

var config = require('./config.js'),
  postbacks = require('./postbakcs.js'),
  dispatch = require('./dispatch.js');

var sessionUser;

function sendTextMessage(sender, text) {
  var messageData = {
    text: text
  };
  dispatch(messageData, sender);
}

function start(sender) {
  var messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Welcome to MDL Telco",
            "subtitle": `Hello ${sessionUser.first_name}! What would you like to do?`,
            "buttons": [
              {
                "type": "postback",
                "title": "Mobile",
                "payload": "mobile"
              }, {
                "type": "postback",
                "title": "Fixed line & Broadband",
                "payload": "flbb"
              }, {
                "type": "postback",
                "title": "DTH",
                "payload": "dth"
              }
            ]
          }
        ]
      }
    }
  };
  dispatch(messageData, sender);
}

function bill(sender) {
  var messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": `Bill summary of ${sessionUser.phoneNumber}`,
            "image_url": "http://boiling-gorge-79536.herokuapp.com/img/bill.png",
            "subtitle": `To help you further choose a command`,
            "buttons": [
              {
                "type": "web_url",
                "title": "Detailed bill",
                "url": "http://www.google.com"
              }, {
                "type": "postback",
                "title": "Update Plan",
                "payload": "update"
              }, {
                "type": "postback",
                "title": "Recommended Plan",
                "payload": "recommended"
              }
            ]
          }
        ]
      }
    }
  };
  dispatch(messageData, sender);
}

function handleMessage(event) {
  if (event.message && event.message.text) {
    text = event.message.text;
    if (text === 'hi') {
      start(sender);
    } else if (_.isNumber(+text) && text.length === 10) {
      config.setPhoneNumber(+text);
      sessionUser = config.getUser();
      sendTextMessage(sender, `I have send an OTP to the phone number ${sessionUser.phoneNumber}. Please type your OTP below after you receive it.`);
    } else if (_.isNumber(+text) && text === '1234') {
      bill(sender);
    } else {
      sendTextMessage(sender, `I am sorry ${sessionUser.first_name}, I am unable to understand what you mean.`.substring(0, 200));
    }
  } else if (event.postback) {
    var action = event.postback.payload;
    postbacks[action](sender);
  }
}

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/img', express.static(__dirname + '/img'));

app.get('/webhook', function (req, res) {
  console.log('get webhook' + req.query['hub.verify_token']);
  if (req.query['hub.verify_token'] === config.token) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

app.post('/webhook/', function (req, res) {

  messaging_events = req.body.entry[0].messaging;

  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;

    if (typeof config.getUser() === 'undefined') {
      https.get('https://graph.facebook.com/v2.6/' + sender + '?access_token=' + config.token, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (d) {
          config.setUser(d);
          sessionUser = config.getUser();
          handleMessage(event);
        });
      }).on('error', function (e) {
        console.error(e);
      });
    } else {
      sessionUser = config.getUser();
      handleMessage(event);
    }
  }
  res.sendStatus(200);
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
