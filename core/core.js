(function () {

  var _ = require('lodash');
  var clc = require("cli-color");
  var request = require('request');
  var token = "EAAMdMrzztUMBAIHGRHpttv7BadmCY96ZAcHnXdDiwRIKKDZCpnWqpShneEM0sP6avJA7AhlZBGGInxt3ZCMIhduaFBRj6VmcQSiKF5e4XFJeaKiFA95GMH04t6TaEBlax1cyBDP621r5ITjmJuZCKTyyD2sTtpkBJxcRpy2JwhgZDZD";

  var core = {}, app = {};

  var artifacts = {
    validators: {},
    responses: {},
    expectations: {},
    responseExpectation: {}
  };

  function register(type) {
    return function (name, body, next) {
      if (_.isUndefined(artifacts[type][name])) {
        artifacts[type][name] = body;
        if (!_.isUndefined(next) && type === 'responses') {
          artifacts.responseExpectation[name] = next;
        }
      } else {
        console.error(clc.red(`${type} : ${name} already registered`));
      }
    };
  }

  function listArtifacts(type) {
    return function () {
      return _.keys(artifacts[type])
    };
  }

  function invoke(type) {
    return function (name, params) {
      if (_.isUndefined(artifacts[type][name])) {
        console.error(clc.red(`${name} is not a registered ${type}!!! You may want to check for typo as well.`));
      } else {
        if (type === 'responses' && _.isUndefined(artifacts.responseExpectation[name])) {
          app.expectation = 'postback';
        } else {
          app.expectation = artifacts.responseExpectation[name];
        }
        return artifacts[type][name].call(this, params)
      }
    };
  }

  /**
   * Validators
   */

  core.validator = register('validators');

  core.getAllValidators = listArtifacts('validators');

  core.validate = invoke('validators');

  /**
   * Responses
   */

  core.response = register('responses');

  core.getAllResponses = listArtifacts('responses');

  core.respond = invoke('responses');

  /**
   * Expectations
   */

  core.expectation = register('expectations');

  core.getAllExpectations = listArtifacts('expectations');

  core.expect = function (expectation, payload) {
    var foo = artifacts.expectations[expectation].call();
    if (core.validate(foo.validators[0], payload)) {
      return core.respond(foo.success[0]);
    } else {
      return core.respond(foo.fail[0]);
    }
  };

  /**
   * Process
   * @param payload
   */
  core.processExpectation = function (payload) {
    console.log(app.expectation);
    return app.expectation !== 'postback' ? core.expect(app.expectation, payload) : core.respond('fail');

  };

  core.processPostback = function (payload) {
    console.log(app.expectation);
    return app.expectation === 'postback' ? core.respond(payload) : core.respond('fail');
  };

  core.dispatch = function (message, sender) {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: token},
      method: 'POST',
      json: {
        recipient: {id: sender},
        message: message,
      }
    }, function (error, response) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  };

  core.bootstrap = function (initExpectation) {
    if (_.isUndefined(app.expectation)) {
      app.expectation = initExpectation;
      app.state = {};
    }
  };

  core.getExpectation = function () {
    return app.expectation;
  };

  /**
   * Export
   */

  module.exports = core;

}());
