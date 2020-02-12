const socketIO = require('socket.io');

function init(server) {
  const io = socketIO(server);
  console.log('Sockets server is listenning for connections!');

  io.on('connection', (socket) => {
    console.log('client connected!');
  });
}

module.exports = {
  init,
};
