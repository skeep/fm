var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  res.send('Hello World');
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'EAAMdMrzztUMBAIHGRHpttv7BadmCY96ZAcHnXdDiwRIKKDZCpnWqpShneEM0sP6avJA7AhlZBGGInxt3ZCMIhduaFBRj6VmcQSiKF5e4XFJeaKiFA95GMH04t6TaEBlax1cyBDP621r5ITjmJuZCKTyyD2sTtpkBJxcRpy2JwhgZDZD') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
