const pm2 = require('pm2');
const proxy = require('fastify-http-proxy');

module.exports = function (fastify, options, done) {
  fastify.register(proxy, {
    upstream: 'http://localhost:8055',
    prefix: 'api/',
    http2: false,
  });
  done();
};
