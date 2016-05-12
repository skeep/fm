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
        text: `Your credit balance is = ${res.currency}${res.balance}`
      });
    })
    .catch(function (err) {
      console.error(err);
    });
  return deferred.promise;
}, 'statement');
