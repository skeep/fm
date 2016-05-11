/**
 * Created by suman on 09/05/16.
 */

var core = require('chanakya');

core.expectation('phoneno', function () {
  return {
    validators : ['isPhoneno'],
    success : ['otp'],
    fail: ['fail']
  };
});

core.expectation('greetings', function () {
  return {
    validators : ['isGreetings'],
    success : ['start'],
    fail: ['fail']
  };
});

core.expectation('otp', function () {
  return {
    validators : ['isOTP'],
    success : ['bill'],
    fail: ['fail']
  };
});

core.expectation('statement', function () {
  return {
    validators : ['isStatement'],
    success : [],
    fail: ['fail']
  };
});
