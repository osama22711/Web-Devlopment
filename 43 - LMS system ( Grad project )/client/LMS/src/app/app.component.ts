import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private API_URL = 'ws://localhost:5000';
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io(this.API_URL, {
      transports: ['websocket']
    })
  }

  ngOnInit() {
    this.socket.on('connect', () => {
      console.log('connected to the socket server!!');

      this.socket.emit('join-rooms','35ROOMID35');

      // if user connects consoleLog
      this.socket.on('user-connected', () => {
        console.log(`User connected!`);
      });

      // if user disconnects consoleLog
      this.socket.on('user-disconnected', () => {
        console.log(`User disconnected!`);
      });

      
      const myVideo = document.createElement('video');
      const videoGrid = document.getElementById('video-grid');

      myVideo.muted = true;
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        myVideo.srcObject = stream;
        videoGrid.appendChild(myVideo);
        myVideo.addEventListener('loadedmetadata', () => {
          myVideo.play();
        });
      });


    });
  }
}
