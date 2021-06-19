const fs = require('fs');
const path = require('path');

// Get ENV Settings
require('dotenv').config();

// Prepare server
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

fastify.register(require('fastify-cors'), {});

// Setup and start directus
fastify.register(require('./plugins/api'), {});

// Setup and start search
fastify.register(require('./plugins/www'), {});

const start = async () => {
  try {
    await fastify.listen(process.env.IO_PORT || 8080, '0.0.0.0');
    gracefulServer.setReady();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
