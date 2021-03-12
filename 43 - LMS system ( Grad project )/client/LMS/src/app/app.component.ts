import { VirtualClassService } from './virtual-class/virtual-class.service';
import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { SOCKETIO_URL } from 'src/environments/constants';

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
  }
}
