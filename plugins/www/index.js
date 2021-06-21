const proxy = require('fastify-http-proxy');

module.exports = function (fastify, options, done) {
  fastify.register(proxy, {
    upstream: 'http://localhost:3000',
    prefix: '/',
    http2: false,
  });
  done();
};
