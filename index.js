'use strict';

const Hapi = require('hapi');
const pool = require('./postgresql');



// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: process.env.PORT || 8080 
});

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./public/index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/public/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });
});

server.route({
    method: 'GET',
    path: '/path',
    handler: function(request, reply) {
      pool.connect(function(err, client, done) {
        if(err) {
          console.log(err);
          reply(err);
        } else {
          client.query('SELECT position_id, point, depth, datetime from position order by datetime asc', [], function(err, result) {
            done();

            if(err) {
              console.log(err);
              reply(err);
            } else {
              reply(result.rows);
            }
          });
        }
      });
    }
});

server.route({
    method: 'GET',
    path: '/data',
    handler: function(request, reply) {
      // ToDo
      reply({});
    }
});

server.route({
    method: 'GET',
    path: '/transect',
    handler: function(request, reply) {
      reply([
          {x: 50.375,    y: -4.175 },
          {x: 48.643208, y: -2.025772}
      ]);
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

