let handleFail = function(err) {
    console.log('Error', err);
}

let remoteContainer = document.getElementById('remote-container');
let canvasContainer = document.getElementById('canvas-container');

function addVideoStream(streamId) {
    let streamDiv = document.createElement('div');
    streamDiv.id=streamId;
    streamDiv.style.transform='rotateY(180deg)';
    remoteContainer.appendChild(streamDiv);
}

function remoteVideoStream(evt) {
    let stream = evt.stream;
    stream.stop();
    let remDiv = document.getElementById(stream.getId());
    remDiv.parentNode.removeChild(remDiv);
    console.log('Remote stream is removed ' + stream.getId());
}

function addCanvas(streamId) {
    let video = document.getElementById(`video${streamId}`); // set by agora sdk
    let canvas = document.createElement('canvas');
    canvasContainer.appendChild(canvas);
    let ctx = canvas.getContext('2d');

    video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height= video.videoHeight;
    });

    video.addEventListener('play', () => {
        var $this = this; // cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                if($this.width !== canvas.width) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                }
                ctx.drawImage($this,0,0);
                setTimeout(loop, 1000/30); // 30 FPS
            }
        })();
    }, 0);
}

let client = AgoraRTC.createClient({
    mode: 'live',
    codec: 'h264'
});
client.init('37efc00617fb47e197380c5bb260f4f0', () => console.log('Client inialized !'));

client.join(null, 'agora-demo', null, (uid)=> {
    let localStream = AgoraRTC.createStream({
        streamID: uid,
        audio: false,
        video: true,
        screen: false,
    });

    localStream.init(() => {
        localStream.play('me');
        client.publish(localStream,handleFail);
        client.on('stream-added', (evt) => {
            client.subscribe(evt.stream,handleFail);
        } );

        client.on('stream-subscribed', (evt) => {
            let stream = evt.stream;
            addVideoStream(stream.getId());
            stream.play(stream.getId());
            addCanvas(stream.getId());
        });

        client.on('stream-removed', remoteVideoStream);
    }, handleFail);
}, handleFail);