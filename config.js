(function () {
  var token = "EAAMdMrzztUMBAIHGRHpttv7BadmCY96ZAcHnXdDiwRIKKDZCpnWqpShneEM0sP6avJA7AhlZBGGInxt3ZCMIhduaFBRj6VmcQSiKF5e4XFJeaKiFA95GMH04t6TaEBlax1cyBDP621r5ITjmJuZCKTyyD2sTtpkBJxcRpy2JwhgZDZD";
  var sessionUser, sessionPhoneNumber;

  function setUser(userDetails) {
    sessionUser = JSON.parse(userDetails);
  }

  function getUserDetails() {
    return sessionUser;
  }

  function setPhoneNumber(number) {
    sessionUser.phoneNumber = number;
  }

  module.exports = {
    token: token,
    setUser: setUser,
    getUser: getUserDetails,
    setPhoneNumber: setPhoneNumber
  };
}());
