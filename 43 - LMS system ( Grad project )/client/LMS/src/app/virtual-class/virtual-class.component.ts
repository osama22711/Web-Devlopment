import { VirtualClassService } from './virtual-class.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import * as pdfJS from 'pdfjs-dist/es5/build/pdf.js';
import * as pdfjsWorker from 'pdfjs-dist/es5/build/pdf.worker.entry.js';
import { NbDialogService } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { authData } from '../models/auth.model';
import peerjs from 'peerjs';
import { message } from '../models/message.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { joinedDrawing } from '../models/joinedDrawing.model';
pdfJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

@Component({
  selector: 'app-virtual-class',
  templateUrl: './virtual-class.component.html',
  styleUrls: ['./virtual-class.component.scss'],
})
export class VirtualClassComponent implements AfterViewInit, OnDestroy {
  adminFormGroup: FormGroup;

  @ViewChild('whiteboard') private canvasRef: ElementRef;
  @ViewChild('loginDialog') private dialogRef: TemplateRef<any>;
  @ViewChildren('messageContainer') messageContainer: QueryList<ElementRef>;
  private canvas: HTMLCanvasElement;
  private colors = document.getElementsByClassName('color');
  private context: CanvasRenderingContext2D;

  private current = {
    x: 0,
    y: 0,
    color: 'black',
  };
  private isDrawing: boolean = false;
  private renderTask = null;
  public authData: authData;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  public pdfPageNumber = 1;
  public pdfFile;
  public isLoading = false;
  public messages$: BehaviorSubject<message[]> = new BehaviorSubject([]);

  private myVideoStream;
  private myVideo = document.createElement('video');
  private videoGrid: HTMLElement;
  private userId = null;
  private myPeer = null;
  private peers = {};

  constructor(
    private dialogService: NbDialogService,
    private classService: VirtualClassService
  ) {
    this.initFormGroup();
    this.myPeer = new peerjs(undefined, {
      host: '/',
      path: '/peerjs',
      port: 3031,
    });
    this.myPeer.on('open', (id) => {
      this.userId = id;
    });
  }

  connectToNewUser(userId, stream) {
    const call = this.myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', (userVideoStream) => {
      console.log(userVideoStream);
      this.addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
      video.remove();
    });
    this.peers[userId] = call;
  }

  addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    video.style.width = '100%';
    video.style.border = '1px solid rgb(44 51 73 / 20%)';
    video.style.boxShadow = '0 0.5rem 1rem 0 rgb(44 51 73 / 10%)';
    this.videoGrid.append(video);

    const icon = document.querySelector(
      '.video-container img'
    ) as HTMLImageElement;
    icon.style.display = 'none';
  }

  ngAfterViewInit() {
    this.videoGrid = document.querySelector('.video-container');
    this.myVideo.muted = true;

    this.messageContainer.changes
      .pipe(takeUntil(this._destroy$))
      .subscribe((elements) => {
        if (elements && elements.last) {
          (elements.last.nativeElement as HTMLLIElement).scrollIntoView();
        }
      });

    this.listenOnAuth();
    this.dialogService.open(this.dialogRef, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
      context: 'this is some additional data passed to dialog',
    });
  }

  onCanvasInitalization() {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');

    this.listenOnJustJoinedDrawing();
    this.listenOnDraw();
    this.listenOnPdfFile();
    this.listenOnImageFile();
    this.listenOnLoading();
    this.listenOnCall();
    this.listenOnMessages();

    // Default canvas height and width and pdfFile to null
    this.resetData();
  }

  drawLine(x0, y0, x1, y1, color, emit = false) {
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();

    if (!emit) {
      return;
    }
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.classService.socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color,
    });
  }

  onMouseDown(e) {
    this.isDrawing = true;
    const bounds = this.canvas.getBoundingClientRect();
    this.current.x = e.pageX - bounds.left - scrollX;
    this.current.y = e.pageY - bounds.top - scrollY;
  }

  onMouseUp(e) {
    if (this.isDrawing === false || !this.authData.isTeacher) {
      return;
    }
    this.isDrawing = false;
    const bounds = this.canvas.getBoundingClientRect();
    this.drawLine(
      this.current.x,
      this.current.y,
      e.pageX - bounds.left - scrollX,
      e.pageY - bounds.top - scrollY,
      this.current.color,
      true
    );
  }

  onMouseMove(e) {
    if (this.isDrawing === false || !this.authData.isTeacher) {
      return;
    }
    const bounds = this.canvas.getBoundingClientRect();
    this.drawLine(
      this.current.x,
      this.current.y,
      e.pageX - bounds.left - scrollX,
      e.pageY - bounds.top - scrollY,
      this.current.color,
      true
    );
    this.current.x = e.pageX - bounds.left - scrollX;
    this.current.y = e.pageY - bounds.top - scrollY;
  }

  listenOnAuth() {
    this.classService.socket.on('auth', async (data: authData) => {
      this.authData = data;
      console.log(data);

      if (data.isTeacher) {
        console.log('creating video...');
        await navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream) => {
            this.myVideoStream = stream;
            this.addVideoStream(this.myVideo, stream);
          });
      }
    });
  }

  listenOnCall() {
    this.classService.socket.on('user-connected', (userId) => {
      console.log('User connected with id: ', userId);
      this.connectToNewUser(userId, this.myVideoStream);
    });

    this.classService.socket.on('user-disconnected', (userId) => {
      console.log('user-disconnected: ', userId);
      if (this.peers[userId]) this.peers[userId].close();
      const video = document.querySelector('.video-container video');
      video.remove();
      const icon = document.querySelector(
        '.video-container img'
      ) as HTMLImageElement;
      icon.style.display = 'unset';
    });

    this.myPeer.on('call', (call) => {
      call.answer(this.myVideoStream);
      const video = document.createElement('video');
      call.on('stream', (userVideoStream) => {
        this.addVideoStream(video, userVideoStream);
      });
    });
  }

  listenOnMessages() {
    this.classService.socket.on('createMessage', (data: message) => {
      const isSender = data.username === this.authData.name ? true : false;
      data.isSender = isSender;
      this.messages$.next([...this.messages$.value, data]);
    });
  }

  sendMessage(event) {
    const message = event.srcElement.value;
    if (message === '' || !message) return;
    const username = this.userNameInput.value;
    this.classService.socket.emit('message', { message, username });
    event.srcElement.value = '';
  }

  listenOnDraw() {
    this.classService.socket.on('drawing', (data) => {
      const w = this.canvas.width;
      const h = this.canvas.height;
      this.drawLine(
        data.x0 * w,
        data.y0 * h,
        data.x1 * w,
        data.y1 * h,
        data.color
      );
    });
  }

  listenOnPdfFile() {
    this.classService.socket.on('pdfFile', async (data) => {
      this.classService.getFile(data.pdfName, 'pdf').then(async (data) => {
        await this.placePdf(data, data.pdfPages);
      });
    });

    this.classService.socket.on('pdfNextPreviousPage', (pageNumber, array) => {
      this.pdfPageNumber = pageNumber;
      this.nextPreviousPage(pageNumber).then(() => {
        const w = this.canvas.width;
        const h = this.canvas.height;

        array.forEach((data) => {
          this.drawLine(
            data.x0 * w,
            data.y0 * h,
            data.x1 * w,
            data.y1 * h,
            data.color
          );
        });
      });
    });
  }

  listenOnImageFile() {
    this.classService.socket.on('imageFile', (data) => {
      this.placePicture(data);
    });
  }

  listenOnLoading() {
    this.classService.socket.on('isLoading', (loaded) => {
      this.isLoading = loaded;
    });
  }

  listenOnJustJoinedDrawing() {
    this.classService.socket.on(
      'justJoinedDrawing',
      async (joinedData: joinedDrawing) => {
        this.isLoading = true;
        if (joinedData.file?.type === 'pdf') {
          await this.classService
            .getFile(joinedData.file?.name, 'pdf')
            .then(async (data) => {
              await this.placePdf(data, joinedData.file?.page);
            });
        } else if (joinedData.file?.type === 'image') {
          await this.placePicture(joinedData.file?.name);
        }
        joinedData.messages.forEach((message) => {
          const isSender =
            message.username === this.authData.name ? true : false;
          message.isSender = isSender;
        });
        this.messages$.next(joinedData.messages);
        this.justJoinedDrawing(joinedData.drawingData);
      }
    );
  }

  placePicture(pictureData: string) {
    return new Promise((resolve) => {
      this.resetData();
      const base_image = new Image();
      base_image.src = pictureData;
      base_image.onload = () => {
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        resolve(
          this.context.drawImage(
            base_image,
            0,
            0,
            this.canvas.width,
            this.canvas.height
          )
        );
      };
    });
  }

  placePdf(pdfData: string, pageNumber?: number) {
    return new Promise((resolve) => {
      this.isLoading = true; // Loading...
      if (!this.authData.isTeacher) {
        this.classService.emitOnLoading(true, this.authData.id);
      }
      const loadingTask = pdfJS.getDocument(pdfData);
      loadingTask.promise
        .then((pdf) => {
          this.pdfFile = pdf;
          resolve(this.nextPreviousPage(pageNumber ? pageNumber : 1));
        })
        .catch((err) => {
          console.error(`Error loading pdf file!`);
        });
    });
  }

  nextPreviousPage(pageNumber: number) {
    return new Promise((resolve, reject) => {
      // If there is any rendering task cancel it
      if (this.renderTask) {
        this.renderTask.cancel();
      }
      this.pdfFile
        .getPage(pageNumber)
        .then((page) => {
          const viewport = page.getViewport({ scale: 1 });
          this.canvas.height = viewport.height;
          this.canvas.width = viewport.width;
          const renderContext = {
            canvasContext: this.context,
            viewport: viewport,
          };
          this.renderTask = page.render(renderContext);
          this.renderTask.promise
            .then((data) => {
              this.renderTask = null;
              if (!this.authData.isTeacher) {
                this.classService.emitOnLoading(false, this.authData.id);
              }
              resolve(data);
            })
            .catch((err) => {
              this.renderTask = null;
              reject(`Rendering was canceled at page ${pageNumber}`);
            });
        })
        .catch((err) => {
          reject(`Error loading page at ${pageNumber}`);
        });
    });
  }

  nextPage() {
    if (this.pdfPageNumber === this.pdfFile.numPages) {
      return;
    }

    ++this.pdfPageNumber;
    this.classService.socket.emit('pdfNextPreviousPage', this.pdfPageNumber);
    this.nextPreviousPage(this.pdfPageNumber).catch((err) => {
      --this.pdfPageNumber;
      console.error(err);
    });
  }

  previousPage() {
    if (this.pdfPageNumber <= 1) {
      return;
    }

    --this.pdfPageNumber;
    this.classService.socket.emit('pdfNextPreviousPage', this.pdfPageNumber);
    this.nextPreviousPage(this.pdfPageNumber).catch((err) => {
      ++this.pdfPageNumber;
      console.error(err);
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      const file = event.target.files[0];

      reader.onload = (e) => {
        const data = reader.result.toString();
        if (file.type === 'application/pdf') {
          this.placePdf(data).then(() => {
            this.classService.placeFile(
              file.name,
              'pdf',
              event.target.files[0],
              this.pdfFile.numPages
            );
          });
        } else {
          this.placePicture(data).then(() => {
            this.classService.socket.emit('imageFile', data);
          });
        }
      };
    }
  }

  canvasToBlob() {
    // Needs to be maintained...
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    });
  }

  justJoinedDrawing(currentPageDrawing: any) {
    if (currentPageDrawing.length === 0) {
      this.isLoading = false;
      return;
    }

    const w = this.canvas.width;
    const h = this.canvas.height;

    currentPageDrawing.forEach((data) => {
      this.drawLine(
        data.x0 * w,
        data.y0 * h,
        data.x1 * w,
        data.y1 * h,
        data.color
      );
    });

    this.isLoading = false;
  }

  resetData() {
    const container = document.querySelector('.whiteboard');
    this.pdfFile = null;
    this.canvas.width = container.clientWidth;
    this.canvas.height = 600;
    this.canvas.style.backgroundColor = '#f3fffd';
  }

  loginButton(ref) {
    const model = {
      roomName: this.roomNameInput.value,
      userName: this.userNameInput.value,
      userId: this.userId,
    };
    this.classService.socket.emit('join-room', model);
    this.onCanvasInitalization();
    ref.close();
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

  get roomNameInput() {
    return this.adminFormGroup.get('roomNameInput');
  }
  get userNameInput() {
    return this.adminFormGroup.get('userNameInput');
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
