const app = require('./app');
const vcr = require('./api/vcr');

const port = process.env.PORT || 3031;
const ioPort = process.env.PORT + 2 || 4000;

app.server.listen(port, () => {
  app.io.listen(ioPort);
  /* eslint-disable no-console */
  console.log(`👂 Listening: http://localhost:${port}`);
  console.log(`👂 Listening for SOCKET.IO at: ws://localhost:${ioPort}`);
  /* eslint-enable no-console */
  new vcr.appService(app.io);
});
