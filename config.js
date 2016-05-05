(function () {
  var token = "EAAMdMrzztUMBAIHGRHpttv7BadmCY96ZAcHnXdDiwRIKKDZCpnWqpShneEM0sP6avJA7AhlZBGGInxt3ZCMIhduaFBRj6VmcQSiKF5e4XFJeaKiFA95GMH04t6TaEBlax1cyBDP621r5ITjmJuZCKTyyD2sTtpkBJxcRpy2JwhgZDZD";
  var sessionUser = {};

  function setUser(userDetails) {
    sessionUser = userDetails;
  }

  function getUserDetails() {
    return sessionUser;
  }

  module.exports = {
    token: token,
    setUser: setUser,
    getUser: getUserDetails
  };
}());
