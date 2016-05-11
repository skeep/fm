/**
 * Created by suman on 08/05/16.
 */

var core = require('chanakya');
var _ = require('lodash');
var Q = require('q'),
  http = require('http');

core.response('start', function () {
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: `Welcome to MDL Telco`,
            subtitle: `Hello! What would you like to do?`,
            buttons: [
              {
                type: 'postback',
                title: 'Mobile',
                payload: 'askMobile'
              }, {
                type: 'postback',
                title: 'Fixed line & Broadband',
                payload: 'askFLBB'
              }, {
                type: 'postback',
                title: 'DTH',
                payload: 'askDTH'
              }
            ]
          }
        ]
      }
    }
  };
});

core.response('otp', function () {
  return {
    text: `I have send an OTP to the phone number 9945458300. Please type your OTP below after you receive it.`
  };
}, 'otp');

core.response('fail', function (to) {
  return {
    text: `I am sorry ${to.first_name}, I am unable to understand what you mean.`
  };
});

core.response('bill', function () {
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": `Bill summary of 9945458300`,
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
                "payload": "plans"
              }
            ]
          }
        ]
      }
    }
  };
});

core.response('askMobile', function () {
  return {
    text: `What is the mobile number Suman?`
  };
}, 'phoneno');

core.response('plans', function () {
  return {
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
});

core.response('buy', function () {
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "receipt",
        "recipient_name": `Suman Paul`,
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
});

core.response('balance', function (to) {
  var deferred = Q.defer();

  http.get('http://demo1036853.mockable.io/balance', function (res) {
    res.setEncoding('utf8');
    res.on('data', function (d) {
      d = JSON.parse(d);
      deferred.resolve({
        text: `Your balance is ${d.amount}$`
      });
    });
  }).on('error', function (e) {
    deferred.reject(new Error(e));
  });
  return deferred.promise;
}, 'statement');
