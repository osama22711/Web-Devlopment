import { VirtualClassService } from './../virtual-class/virtual-class.service';
import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { pagesMenu } from './pages-menu';
import { Router } from '@angular/router';
import { authData } from '../models/auth.model';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss'],
})
export class MainmenuComponent implements AfterViewInit {
  menuItems = this.pagesMenu.MENU_ITEMS;
  adminFormGroup: FormGroup;
  joinFormGroup: FormGroup;
  public rooms = [];
  @ViewChild('loginDialog') private dialogRef: TemplateRef<any>;
  @ViewChild('joinDialog') private joinDialog: TemplateRef<any>;

  constructor(
    private pagesMenu: pagesMenu,
    private dialogService: NbDialogService,
    private classService: VirtualClassService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.initFormGroup();
    this.initJoinGroup();
    this.classService.socket.emit('list-rooms');
    this.classService.socket.on('list-rooms', (data) => {
      this.rooms = data;
    });
  }

  onCreateRoom() {
    this.dialogService.open(this.dialogRef, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
      context: 'this is some additional data passed to dialog',
    });
  }

  onJoinRoom(data: any) {
    this.dialogService.open(this.joinDialog, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
      context: data,
    });
  }

  // ------------------
  // Formgroup things
  // ------------------

  initFormGroup() {
    this.adminFormGroup = new FormGroup({
      roomNameInput: new FormControl(null, [Validators.required]),
      userNameInput: new FormControl(null, [Validators.required]),
    });
  }

  initJoinGroup() {
    this.joinFormGroup = new FormGroup({
      usernameInput: new FormControl(null, [Validators.required]),
    });
  }

  get usernameInput() {
    return this.joinFormGroup.get('usernameInput');
  }

  get roomNameInput() {
    return this.adminFormGroup.get('roomNameInput');
  }
  get userNameInput() {
    return this.adminFormGroup.get('userNameInput');
  }

  listenOnAuth() {
    this.classService.socket.on('auth', async (data: authData) => {
      console.log(data);
      this.classService.authData = data;
      await this.router.navigateByUrl('virtual-class');
    });
  }

  loginButton(type: string, ref, data?: any) {
    let model = {
      roomName: '',
      userName: '',
      userId: '',
    };
    if (type === 'create') {
      model.roomName = this.roomNameInput.value;
      model.userName = this.userNameInput.value;
      model.userId = this.classService.peerID;
    } else if (type === 'join') {
      console.log(data);
      this.classService.joinedRoomData = data;
      model.roomName = data.name;
      model.userName = this.usernameInput.value;
      model.userId = this.classService.peerID;
    }
    this.classService.socket.emit('join-room', model);
    this.listenOnAuth();
    ref.close();
  }
}
