'use strict';

const Hapi = require('hapi');
const pool = require('./postgresql');

const transect = [
[-2.02921437077907,48.64025173323246,0],
[-2.031918193380241,48.64033507882057,0],
[-2.0378468409442703,48.63893604523883,0],
[-2.039993729986396,48.640400564542595,0],
[-2.050243104032695,48.64974033378068,0],
[-2.0541416389460108,48.65291867294089,0],
[-2.0596211465430683,48.65589446325078,0],
[-2.0682176855109105,48.66211329450326,0],
[-2.076598637294606,48.66507068795073,0],
[-2.085141279466412,48.668819245673276,0],
[-2.0907016322575243,48.67465572715634,0],
[-2.093135970878512,48.68015246393949,0],
[-2.1067898258744577,48.694420936976364,0],
[-2.1313757476665,48.718909926789884,0],
[-2.351705849864238,48.86881017032037,0],
[-2.458322695224029,48.96019514682076,0],
[-3.0104145254252352,49.395759915792745,0],
[-4.113825665084455,50.19102626782775,0],
[-4.151481559915379,50.300559863199226,0],
[-4.156664635134236,50.32145277071717,0],
[-4.166491817611581,50.33417267306763,0],
[-4.1539248813357075,50.343078016955644,0],
[-4.140306957537119,50.348527328368306,0]
]




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
      reply(
        transect.map(p => ({ x: p[1], y: p[0] }))
      );
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

