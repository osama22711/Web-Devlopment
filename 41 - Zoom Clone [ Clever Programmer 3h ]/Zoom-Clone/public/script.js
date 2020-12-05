const SOCKET_URL = window.location.hostname === 'localhost' ? 'ws://localhost:3031' : 'https://quiet-reef-65924.herokuapp.com';
const PEER_URL = window.location.hostname === 'localhost' ? '/' : 'quiet-reef-65924.herokuapp.com';
const port = PORT !== '3031' ? '443' : '3031';

const socket = io(SOCKET_URL)
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  path: '/peerjs',
  host: PEER_URL,
  port: port
})
let myVideoStream;
const myVideo = document.createElement('video')
myVideo.muted = true;
const peers = {};

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, stream)
})

myPeer.on('call', call => {
  call.answer(myVideoStream);
  console.log(call);
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    console.log(`inside onStream`);
    addVideoStream(video, userVideoStream)
  })
});

socket.on('user-connected', (userId) => {
  console.log(`Remote user id ${userId}`);
  connectToNewUser(userId, myVideoStream)
})
// input value
let text = $("input");
// when press enter send message
$('html').keydown(function (e) {
  if (e.which == 13 && text.val().length !== 0) {
    socket.emit('message', text.val());
    text.val('')
  }
});
socket.on("createMessage", message => {
  $("ul").append(`<li class="message"><b>user</b><br/>${message}</li>`);
  scrollToBottom()
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  console.log(`Local id ${id}`);
  socket.emit('join-room', ROOM_ID, id)
});

function connectToNewUser(userId, localStream) {
  const call = myPeer.call(userId, localStream)
  const video = document.createElement('video');
  console.log(`Inside connectToNewUser ${userId}`);
  console.log(call);

  myPeer.on('stream', (remoteVideoStream) => {
    console.log('hey someone connected');
    addVideoStream(video, remoteVideoStream)
  })

  myPeer.on('close', () => {
    console.log(`Inside onClose`);
    video.remove()
  })

  myPeer.on('error', function(err) {
    console.log(`Error is ${err}`);
  });

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

const shareScreen = () => {
  navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
    const video = document.createElement('video');
    const screenTrack = stream.getVideoTracks()[0];
    addVideoStream(video, stream)
    // Additional ----------------
    // peers.forEach((userId) => {
    //   connectToNewUser(userId, stream);
    // })
  });
}

///  /////////////////////////////////////////////
///             OTHER FUNCTIONS
///  /////////////////////////////////////////////

const scrollToBottom = () => {
  var d = $('.main__chat_window');
  d.scrollTop(d.prop("scrollHeight"));
}


const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
}

const playStop = () => {
  console.log('object')
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo()
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}

const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
  document.querySelector('.main__mute_button').innerHTML = html;
}

const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
  document.querySelector('.main__video_button').innerHTML = html;
}
