(function () {

  var dispatch = require('./dispatch.js');

  var postbacks = {
    services: function (sender) {
      var messageData = {
        text: 'services called'
      };
      dispatch(messageData, sender);
    }
  };

  module.exports = postbacks;
}());
