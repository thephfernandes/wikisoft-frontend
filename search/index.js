module.exports = function (fastify, options, done) {
  // Register Postgress Connection
  fastify.register(require('fastify-postgres'), {
    connectionString: process.env.DB_CONNECTION_STRING,
    native: process.env.NODE_ENV == 'production',
  });

  // Register Redis Connection
  fastify.register(require('fastify-redis'), {
    url: process.env.WIKI_REDIS_URL,
  });

  done();
};
