const socketIO = require('socket.io');

function init(server) {
    const io = socketIO(server);

    io.on('connection', () => {
        console.log('client connected!');
    });
}

module.exports = {
    init
};