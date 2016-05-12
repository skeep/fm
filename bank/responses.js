/**
 * Created by suman on 08/05/16.
 */

var core = require('chanakya');
var _ = require('lodash');
var Q = require('q'),
  http = require('http');
var rp = require('request-promise');

core.response('fail', function (to) {
  return {
    text: `I am sorry ${to.first_name}, I am unable to understand what you mean. Please rephrase and send back.`
  };
});

core.response('balance', function (to) {

  console.log(to);

  var deferred = Q.defer();

  var options = {
    uri: `https://polar-atoll-33216.herokuapp.com/users/1`,
    headers: {
      'Authorization': 'Bearer LUPCP5OOAFQXURYOH7I7YVU4FGBGVAG3',
      'Accept': 'application/vnd.wit.20141022+json'
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (res) {
      deferred.resolve({
        text: `Your balance is =${res.currency}${res.balance}`
      });
    })
    .catch(function (err) {
      console.error(err);
    });
  return deferred.promise;
}, 'statement');

core.response('creditcard', function (to) {
  return {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          {
            "title":"NBA American Express Card",
            "image_url":"https://s3.amazonaws.com/facebookbot/NBA+American+Express+Card.png",
            "subtitle":"9.49% to 29.49% variable APR based on your creditworthiness",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.efirstbank.com/customer-service/find-location.htm",
                "title":"Apply for this card"
              },
              {
                "type":"web_url",
                "url":"https://www.efirstbank.com/products/credit-loan/credit-cards/credit-cards-visa.htm",
                "title":"View Details",
              },
              {
                "title":"View APR, Terms & Fees",
                "type":"web_url",
                "url":"https://www.efirstbank.com/products/credit-loan/credit-cards/credit-card-agreement.htm",
              }
            ]
          },
          {
            "title":"Clearpoints Credit Card",
            "image_url":"https://s3.amazonaws.com/facebookbot/Clearpoints+Credit+Card.png",
            "subtitle":"9.49% to 23.49% variable APR based on your creditworthiness",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.efirstbank.com/customer-service/find-location.htm",
                "title":"Apply for this card"
              },
              {
                "type":"web_url",
                "url":"https://www.efirstbank.com/products/credit-loan/credit-cards/credit-cards-visa.htm",
                "title":"View Details",
              },
              {
                "title":"View APR, Terms & Fees",
                "type":"web_url",
                "url":"https://www.efirstbank.com/products/credit-loan/credit-cards/credit-card-agreement.htm",
              }
            ]
          },
          {
            "title":"Select Credit Card",
            "image_url":"https://s3.amazonaws.com/facebookbot/Select+Credit+Card.png",
            "subtitle":"1.49% to 17.49% variable APR based on your creditworthiness",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://www.efirstbank.com/customer-service/find-location.htm",
                "title":"Apply for this card"
              },
              {
                "type":"web_url",
                "url":"https://www.efirstbank.com/products/credit-loan/credit-cards/credit-cards-visa.htm",
                "title":"View Details",
              },
              {
                "title":"View APR, Terms & Fees",
                "type":"web_url",
                "url":"https://www.efirstbank.com/products/credit-loan/credit-cards/credit-card-agreement.htm",
              }
            ]
          }
        ]
      }
    }
  };
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
});
