const pm2 = require('pm2');
const proxy = require('fastify-http-proxy');
const hyperid = require('hyperid');
const uuid = hyperid();

module.exports = function (fastify, options, done) {
  fastify.register(proxy, {
    upstream: 'http://localhost:8055',
    prefix: '/api',
    rewritePrefix: '/api',
    http2: false,
    replyOptions: {
      rewriteRequestHeaders: (originalReq, headers) => ({
        ...headers,
        'request-id': uuid(),
      }),
    },
  });
  done();
};
