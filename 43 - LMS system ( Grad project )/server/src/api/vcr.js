const clc = require('cli-color');

class appService {
  /////////////////////////////////////
  //          Local data
  /////////////////////////////////////

  constructor(io) {
    this.data = {
      totalClients: 0,
      rooms: [],
    };
    this.init(io);
  }

  /////////////////////////////////////
  //        End of Local data
  /////////////////////////////////////

  init(io) {
    console.log(clc.redBright('Awaitting connections...'));
    console.log(
      clc.cyan(
        '----------------------------------------------------------------',
      ),
    );

    io.on('connection', (socket) => {
      socket.on('join-room', ({ roomName, userName, userId }) => {
        // If joined late emit current data back

        // Generate unique userId for the user
        // let userId = this.generateUniqueID(roomName);

        this.someoneJoined(socket, roomName, userId, userName);

        // Join the room and tell others that youre connected
        socket.join(roomName);
        socket.to(roomName).broadcast.emit('user-connected', userId);

        // Listen for events...
        this.listenEvents(socket, roomName);

        socket.on('disconnect', () => {
          this.someoneDisconnected(roomName, userId);
          socket.to(roomName).broadcast.emit('user-disconnected', userId);
        });

        socket.on('message', ({ message, username }) => {
          // emit an event to createMessage with message
          this.data?.rooms[`${roomName}`].messages.push({ message, username });
          io.to(roomName).emit('createMessage', { message, username });
        });
      });
    });
  }

  /////////////////////////////////////
  //      Start of functions
  /////////////////////////////////////

  someoneJoined(socket, roomId, userId, userName) {
    const roomData = this.data?.rooms[`${roomId}`]?.data;
    // Emit mediaData back to the just joined guy
    if (roomData?.background.type || roomData?.drawingArray.length > 0) {
      let drawingData =
        roomData.background.type === 'pdf'
          ? roomData.drawingArray[roomData.background.page - 1]
          : roomData.drawingArray;
      const file = roomData.background;
      const messages = this.data?.rooms[`${roomId}`].messages;
      socket.emit('justJoinedDrawing', { file, drawingData, messages });
    }

    // Create roomId object if it doesnt exist
    if (!this.data.rooms[`${roomId}`]) {
      this.data.rooms[`${roomId}`] = {
        usersCount: 0,
        loaded: 0,
        users: {},
        messages: [],
        data: {},
      };
      this.data.rooms[`${roomId}`].data = this.reset('mediaData');
    }

    // create userId object inside users object in a room
    if (!this.data.rooms[`${roomId}`].users[`${userId}`]) {
      let userDoc = {
        id: userId,
        name: userName,
        isLoading: false,
        isTeacher: false,
      };
      if (userName.split('_')[0] === 'teacher') {
        userDoc.isTeacher = true;
      }
      this.data.rooms[`${roomId}`].users[`${userId}`] = userDoc;
      // Sending auth data (userDoc) to the user
      socket.emit('auth', userDoc);
    }
    ++this.data.rooms[`${roomId}`]['usersCount'];
    ++this.data.totalClients;
    console.log(this.data.rooms[`${roomId}`]);
    this.consoleLog();
  }

  listenEvents(socket, roomId) {
    this.listenPdfEvents(socket, roomId);
    this.listenOnDrawing(socket, roomId);
    this.listenOnImageEvents(socket, roomId);
    this.listenOnLoading(socket, roomId);
  }

  listenOnLoading(socket, roomId) {
    socket.on('isLoading', (userId, loading) => {
      console.log(`Loading value is ${loading}`);

      this.data.rooms[`${roomId}`].users[`${userId}`].isLoading = loading;

      if (loading === false) {
        ++this.data.rooms[roomId].loaded;
      }

      if (
        Math.floor(Object.entries(this.data.rooms[roomId].users).length / 2) >=
        this.data.rooms[roomId].loaded
      ) {
        console.log('inside if statement in isLoading');
        this.data.rooms[roomId].loaded = 0;
        socket.to(roomId).broadcast.emit('isLoading', false);
        socket.emit('isLoading', false);
      }
    });
  }

  listenOnDrawing(socket, roomId) {
    socket.on('drawing', (drawingData) => {
      const roomData = this.data.rooms[`${roomId}`]?.data;
      if (roomData?.background.pages > 1) {
        const currentPage = roomData.background.page - 1;
        roomData.drawingArray[currentPage].push(drawingData);
      } else {
        roomData?.drawingArray.push(drawingData);
      }
      socket.to(roomId).broadcast.emit('drawing', drawingData);
    });
  }

  listenOnImageEvents(socket, roomId) {
    socket.on('imageFile', (imageData) => {
      console.log(`Receiveing Data...`);
      this.data.rooms[`${roomId}`].data = this.reset('mediaData');
      const roomData = this.data.rooms[`${roomId}`].data;
      roomData.background.type = 'image';
      roomData.background.name = imageData;
      console.log(this.data.rooms[`${roomId}`]);
      socket.to(roomId).broadcast.emit('imageFile', imageData);
    });
  }

  listenPdfEvents(socket, roomId) {
    socket.on('pdfNextPreviousPage', (pageNumber) => {
      const roomData = this.data.rooms[`${roomId}`]?.data;
      roomData.background.page = pageNumber;
      const currentPage = pageNumber - 1;
      const drawingData = roomData.drawingArray[currentPage];
      // broadcast to all except sender
      socket.broadcast.emit('pdfNextPreviousPage', pageNumber, drawingData);
      // send data back to the sender
      socket.to(roomId).emit('pdfNextPreviousPage', pageNumber, drawingData);
    });
    socket.on('pdfFile', ({ pdfName, pdfPages }) => {
      console.log(`Receiveing Data...`);
      // Resetting mediaData...
      this.data.rooms[`${roomId}`].data = this.reset('mediaData');
      const roomData = this.data.rooms[`${roomId}`].data;
      // Setting mediaData...
      roomData.background.type = 'pdf';
      roomData.background.name = pdfName;
      roomData.background.pages = pdfPages;
      roomData.drawingArray = Array.from({ length: pdfPages }, () => {
        return new Array();
      });
      socket.to(roomId).broadcast.emit('pdfFile', { pdfName, pdfPages });
    });
  }

  someoneDisconnected(roomId, userId) {
    if (!this.data.rooms[roomId] || this.data.rooms[roomId].length === 1) {
      delete this.data.rooms[roomId];
    } else {
      delete this.data.rooms[roomId][userId];
      --this.data.rooms[roomId]['usersCount'];
      // const filtered = data[roomId].filter((id) => {
      //   return id === userId;
      // });
      // data[roomId] = filtered;
    }
    --this.data.totalClients;

    this.consoleLog();
  }

  generateUniqueID(roomName) {
    let id = Math.floor(Math.random() * 100);
    if (this.data.rooms[`${roomName}`]?.users) {
      while (this.data.rooms[`${roomName}`].users[`${id}`]) {
        id = Math.floor(Math.random() * 100);
      }
    }
    return id;
  }

  consoleLog() {
    console.log(
      clc.bold(`Connected clients is: `),
      clc.bold.yellow(`${this.data.totalClients}`),
    );

    if (this.data.totalClients === 0) {
      console.log(clc.redBright('Awaitting connections...'));
    } else {
      for (let obj in this.data.rooms) {
        console.log(
          `${clc.bold('Room')} ${clc.bold.magentaBright(obj)} ${clc.bold(
            'has',
          )} ${clc.bold.yellow(
            this.data.rooms[`${obj}`]['usersCount'],
          )} ${clc.bold('connected users')}`,
        );
      }
    }

    // Separtor
    console.log(
      clc.cyan(
        '----------------------------------------------------------------',
      ),
    );
  }

  reset(type) {
    if (type === 'mediaData') {
      return {
        background: {
          type: null,
          data: null,
          page: 1,
          pages: 1,
        },
        drawingArray: [],
      };
    } else if (type === 'data') {
      return {
        totalClients: 0,
        rooms: [],
      };
    }
  }

  /////////////////////////////////////
  //       End of functions
  /////////////////////////////////////
}

module.exports = {
  appService,
};
