require('dotenv').config();
const fastify = require('fastify')({
  logger: true,
});

const GracefulServer = require('@gquittet/graceful-server');
const gracefulServer = GracefulServer(fastify.server);

gracefulServer.on(GracefulServer.READY, () => {
  console.log('Server is ready');
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

fastify.register(require('fastify-cors'), {
  // put your options here
});

fastify.register(require('fastify-postgres'), {
  connectionString: process.env.IO_DB_STANDBY_CONNECTION_STRING,
  native: true,
});

async function search(request, reply) {
  const client = await fastify.pg.connect();
  const { rows } = await client.query('SELECT * FROM companies');
  client.release();
  return rows;
}
fastify.get('/search', search);
fastify.get('/search/@:type', search);
fastify.get('/search/@:type/@:query', search);
fastify.get('/search/@:type/@:query/@:filters', search);
fastify.get('/search/@:type/@:query/@:filters/@:page', search);

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0');
    fastify.blipp();
    console.log(`server listening on ${fastify.server.address().port}`);
    gracefulServer.setReady();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
