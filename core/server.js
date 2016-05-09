/**
 * Created by suman on 09/05/16.
 */
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  https = require('https'),
  _ = require('lodash');

var core = require('./core.js'),
  responses = require('../artifacts/responses.js'),
  validations = require('../artifacts/validations'),
  expectations = require('../artifacts/expectations');

/**
 * App init
 */

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

app.get('/hello', function (req, res) {
  res.send('hello');
});

app.post('/webhook/', function (req, res) {

  core.bootstrap('greetings');

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

function sendTextMessage(sender, text) {
  var messageData = {
    text: text
  };
  core.dispatch(messageData, sender);
}

function start(sender) {
  core.dispatch(core.respond('start'), sender);
}

function handleMessage(event) {
  if (event.message && event.message.text) {
    core.dispatch(core.processExpectation(event.message.text), sender);
  } else if (event.postback) {
    core.dispatch(core.processPostback(event.postback.payload), sender);
  } else if (event.message && event.message.attachments) {
    sendTextMessage(sender, event.message.attachments[0].payload.url);
  }
}


module.exports = core;
