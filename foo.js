var core = require('./core/core.js');

core.validator('isPhoneno', function (message) {
  return message === 9945458300;
});

core.validator('isGreetings', function (message) {
  return message === 'hi';
});

core.response('success', function () {
  return 'success';
});

core.response('fail', function () {
  return 'fail';
});

core.expectation('phoneno', function () {
  return {
    validators : ['isPhoneno'],
    success : ['success'],
    fail: ['fail']
  };
}, 'greetings');

core.expectation('greetings', function () {
  return {
    validators : ['isGreetings'],
    success : ['success'],
    fail: ['fail']
  };
}, 'phoneno');


// run app

// console.log(core.getAllValidators());
// console.log(core.getAllResponses());
// console.log(core.getAllExpectations());


core.bootstrap('greetings');

(function () {
  core.dispatch(core.process('hi'));
}());
