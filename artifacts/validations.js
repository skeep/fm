/**
 * Created by suman on 09/05/16.
 */

var core = require('../core/core.js');

core.validator('isPhoneno', function (message) {
  return message == 9945458300;
});

core.validator('isGreetings', function (message) {
  return message === 'hi';
});

core.validator('isOTP', function (message) {
  return message == 1234;
});

