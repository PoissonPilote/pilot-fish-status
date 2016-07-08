'use strict';

const Hapi = require('hapi');
const GeoData = require('./geo-data');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 8080
});

server.register(require('inert'), (err) => {
    if (err) { throw err; }

    server.route({
        method: 'GET', path: '/',
        handler: (request, reply) => reply.file('./public/index.html')
    });

    server.route({
        method: 'GET', path: '/public/{param*}',
        handler: {
            directory: { path: 'public' }
        }
    });
});

server.route({
    method: 'GET', path: '/path',
    handler: (request, reply) => reply(GeoData.getTrace())
});

server.route({
    method: 'GET', path: '/data',
    handler: (request, reply) => {
      // ToDo
      reply({});
    }
});

server.route({
    method: 'GET', path: '/transect',
    handler: (request, reply) => reply(GeoData.transect)
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

