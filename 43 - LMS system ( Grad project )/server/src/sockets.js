const socketIO = require('socket.io');

function onDisconnect(reason) {
    console.log(reason);
}

function onJoinRoom(socket, roomId) {
    socket.join(roomId);
    // On connect broadcast message
    socket.to(roomId).broadcast.emit('user-connected');

    // On disconnect broadcast message
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected');
    });
}

function init(server) {
    const io = socketIO(server);
    console.log('sockets server is listenning for connections!');

    io.on('connection', (socket) => {
        console.log('🧔 client connected!');

        socket.on('disconnect', onDisconnect);
        socket.on('join-rooms', (roomId) => onJoinRoom(socket, roomId));
    });
}

module.exports = {
    init
};