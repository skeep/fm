(function () {
  var postbacks = {
    services: function (sender) {
      var messageData = {
        text: 'services called'
      };
      dispatchRequest(messageData, sender);
    }
  };

  module.exports = postbacks;
}());
