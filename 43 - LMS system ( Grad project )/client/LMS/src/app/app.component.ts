import { VirtualClassService } from './virtual-class/virtual-class.service';
import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { SOCKETIO_URL } from 'src/environments/constants';
import peerjs from 'peerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private classService: VirtualClassService) {
    this.classService.socket = io(SOCKETIO_URL, {
      transports: ['websocket'],
    });

    this.classService.myPeer = new peerjs(undefined, {
      host: '/',
      path: '/peerjs',
      port: 3031,
    });
    this.classService.myPeer.on('open', (id) => {
      this.classService.peerID = id;
    });
  }
}
