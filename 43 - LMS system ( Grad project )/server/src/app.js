const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

require('dotenv').config();

const middlewares = require('./middlewares');

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = {
  server,
  io,
};
