/**
 * Created by suman on 09/05/16.
 */

var core = require('chanakya');

core.expectation('statement', function () {
  return {
    validators : ['isStatement'],
    success : [],
    fail: ['fail']
  };
});
