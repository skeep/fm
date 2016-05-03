'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server =  new Hapi.Server(~~process.env.PORT || 3000, '0.0.0.0');

// Add the route
server.route({
    method: 'GET',
    path:'/webhook',
    handler: function (request, reply) {

        return reply('hello world');
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
