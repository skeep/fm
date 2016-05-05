(function () {

  var _ = require('lodash');

  var dispatch = require('./dispatch.js'),
    config = require('./config.js');

  var sessionUser;

  function loadUserDetails() {
    sessionUser = config.getUser();
  }

  var postbacks = {
    mobile: function (sender) {
      loadUserDetails();
      var messageData = {
        text: `What is the mobile number ${sessionUser.first_name}?`
      };
      dispatch(messageData, sender);
    },
    flbb: function (sender) {
      loadUserDetails();
      var messageData = {
        text: 'flbb called'
      };
      dispatch(messageData, sender);
    },
    dth: function (sender) {
      loadUserDetails();
      var messageData = {
        text: 'dth called'
      };
      dispatch(messageData, sender);
    },
    update: function (sender) {
      loadUserDetails();
      var messageData = {
        text: 'update called'
      };
      dispatch(messageData, sender);
    },
    recommended: function (sender) {
      loadUserDetails();
      var messageData = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [
              {
                title: 'Recommended plans',
                "subtitle": `Seems that you like streaming music and videos. Based on your usage, we can recommend you plans that will benefit you. Ready to check it out?`,
                "buttons": [
                  {
                    "type": "postback",
                    "title": "Yes show me better plans",
                    "payload": "plans"
                  }, {
                    "type": "postback",
                    "title": "No",
                    "payload": "no"
                  }
                ]
              }
            ]
          }
        }
      };
      dispatch(messageData, sender);
    },
    plans: function (sender) {
      loadUserDetails();
      var messageData = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [
              {
                "title": "My Plan 299",
                "image_url": "http://lorempixel.com/191/100/abstract/",
                "subtitle": "2GB free data usage for 45 days",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "Buy",
                    "payload": "buy"
                  }
                ]
              },
              {
                "title": "My Plan 499",
                "image_url": "http://lorempixel.com/191/100/technics/",
                "subtitle": "4GB free data usage for 45 days",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "Buy",
                    "payload": "buy"
                  }
                ]
              }
            ]
          }
        }
      };
      dispatch(messageData, sender);
    },
    buy: function (sender) {
      loadUserDetails();
      timestamp = new Date().getTime();
      console.log(timestamp);
      var messageData = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "receipt",
            "recipient_name": `${sessionUser.first_name} ${sessionUser.last_name}`,
            "order_number": _.random(1000000, 9999999, false),
            "currency": "INR",
            "payment_method": "Visa 2345",
            "elements": [
              {
                "title": "My Plan 499",
                "subtitle": "4GB free data usage for 45 days",
                "quantity": 1,
                "price": 499,
                "currency": "INR",
                "image_url": "http://lorempixel.com/191/100/abstract/"
              }
            ],
            "summary": {
              "subtotal": 490.00,
              "total_tax": 9.00,
              "total_cost": 499.00
            }
          }
        }
      };
      dispatch(messageData, sender);
    }
  };

  module.exports = postbacks;
}());
