'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: +process.env.PORT
});

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {

    return reply('hello world');
  }
});

server.route({
  method: 'GET',
  path: '/webhook',
  handler: function (request, reply) {

    if (request.query['hub.verify_token'] === 'EAAMdMrzztUMBAIHGRHpttv7BadmCY96ZAcHnXdDiwRIKKDZCpnWqpShneEM0sP6avJA7AhlZBGGInxt3ZCMIhduaFBRj6VmcQSiKF5e4XFJeaKiFA95GMH04t6TaEBlax1cyBDP621r5ITjmJuZCKTyyD2sTtpkBJxcRpy2JwhgZDZD') {
      return reply(request.query['hub.challenge']);
    }
    return reply('Error, wrong validation token');
  }
});

// Start the server
server.start((err) = > {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
})
;
