require('dotenv').config();

const fastify = require('fastify')({
  logger: true,
  http2: true,
  https: {
    allowHTTP1: true, // fallback support for HTTP1
    key: fs.readFileSync(path.join(__dirname, 'certs', 'wikiprofile.com.key')),
    cert: fs.readFileSync(
      path.join(__dirname, 'certs', 'wikiprofile.com.cert'),
    ),
  },
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

fastify.register(require('fastify-cors'), {
  // put your options here
});

// Register Postgress Connection
fastify.register(require('fastify-postgres'), {
  connectionString: process.env.DB_CONNECTION_STRING,
  native: process.env.NODE_ENV == 'production',
});

// Register Redis Connection
fastify.register(require('fastify-redis'), {
  url: process.env.WIKI_REDIS_URL,
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
