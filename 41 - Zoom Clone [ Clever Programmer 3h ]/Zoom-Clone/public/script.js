const socket = io('quiet-reef-65924.herokuapp.com');
const videoGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/whiteboard-30a4e/us-central1/app/peerjs',
    host: '/',
    port: '5000'
});

let myVideoStream;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);


    peer.on('call', call => {
        // call is called stream
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        });
    });

    // Event when a user connects
    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
    });
});

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});

const connectToNewUser = (userId, stream) => {
    // Calling the new user
    const call = peer.call(userId, stream);
    const video = document.getElementById('video');

    // if event comes from stream which is only users who has video stream sends through its gonna append his video stream to the DOM
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    });
};

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
    video.addEventListener('dblclick', (data) => {
      console.log(data);
      if (window.fullScreen) {
        document.exitFullscreen();
      } else {
        video.requestFullscreen();
      }
    });
}

let text = $('input');

$('html').keydown((e) => {
    if (e.which == 13 && text.val().length !== 0) {
        socket.emit('message', text.val());
        text.val('');
    }
});


// Recieve message from createMessage event
socket.on('createMessage', message => {
    $('.messages').append(`<li class="message"><b>user</b><br/>${message}</li>`);
    scrollToBottom();
});

const scrollToBottom = () => {
    let d = $('.main__chat__window');
    d.scrollTop(d.prop("scrollHeight"));
};

// Mute our video
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

  const shareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
      const video = document.createElement('video');
      const screenTrack = stream.getVideoTracks()[0];
      addVideoStream(video, stream)
    });
  }