require('dotenv').config();
const fastify = require('fastify')({
  logger: true,
});

const GracefulServer = require('@gquittet/graceful-server');
const gracefulServer = GracefulServer(fastify.server);

gracefulServer.on(GracefulServer.READY, () => {
  console.log(`server listening on ${fastify.server.address().port}`);
  fastify.blipp();
});

gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
  console.log('Server is shutting down');
});

gracefulServer.on(GracefulServer.SHUTDOWN, (error) => {
  console.log('Server is down because of', error.message);
});

fastify.register(require('fastify-blipp'), {
  blippLog: (msg) => console.log(msg),
});

// Inject nuxt routes
fastify.register(require('fastify-nuxtjs'), { logLevel: 'info' }).after(() => {
  fastify.nuxt('*');
});

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0');
    gracefulServer.setReady();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
