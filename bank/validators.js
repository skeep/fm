/**
 * Created by suman on 09/05/16.
 */

var core = require('chanakya'),
  http = require('http'),
  Q = require('q'),
  rp = require('request-promise'),
  _ = require('lodash');

core.validator('isStatement', function (message) {

  var deferred = Q.defer();

  var options = {
    uri: `https://api.wit.ai/message?q=${message}`,
    headers: {
      'Authorization': 'Bearer LUPCP5OOAFQXURYOH7I7YVU4FGBGVAG3',
      'Accept': 'application/vnd.wit.20141022+json'
    },
    json: true
  };

  rp(options)
    .then(function (res) {
      deferred.resolve(_.keys(res.outcomes[0].entities)[0]);
    })
    .catch(function (err) {
      console.error(err);
    });

  return deferred.promise;
});
