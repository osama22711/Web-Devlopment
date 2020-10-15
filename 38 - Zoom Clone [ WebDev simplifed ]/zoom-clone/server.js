const express = require('express');
const { on } = require('process');
const app = express();
const server = require('http').Server(app); // creating a server
const io = require('socket.io')(server) // passes server to socket.io
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs'); // ejs is html but on backend
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected ', userId);
        });
    });
});

console.log(`Server started on: http://localhost:3000`);
server.listen(3000);