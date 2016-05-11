/**
 * Created by suman on 09/05/16.
 */

var core = require('chanakya'),
  http = require('http'),
  Q = require('q');

core.validator('isPhoneno', function (message) {
  var deferred = Q.defer();

  http.get('http://apilayer.net/api/validate?access_key=eba101687da317945a45f798464256da&number=' + message + '&country_code=&format=1', function (res) {
    res.setEncoding('utf8');
    res.on('data', function (d) {
      d = JSON.parse(d);
      deferred.resolve(d.valid);
    });
  }).on('error', function (e) {
    deferred.reject(new Error(e));
  });
  return deferred.promise;
});

core.validator('isGreetings', function (message) {
  return Q.fcall(function () {
    return message == 'hi';
  });
});

core.validator('isOTP', function (message) {
  return Q.fcall(function () {
    return message == 1234;
  });
});

core.validator('isStatement', function (message) {
  var deferred = Q.defer();

  http.get('http://demo1036853.mockable.io/wit', function (res) {
    res.setEncoding('utf8');
    res.on('data', function (d) {
      d = JSON.parse(d);
      deferred.resolve(d.intent);
    });
  }).on('error', function (e) {
    deferred.reject(new Error(e));
  });
  return deferred.promise;
});
