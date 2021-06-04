import { authData } from './../models/auth.model';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class VirtualClassService {
  public socket: Socket;
  public myPeer = null;
  public peerID = null;
  public authData: authData;
  public joinedRoomData = null;

  constructor(private storage: AngularFireStorage) {}

  /* Function emitOnLoading
  // Params: 1- loading: boolean
  //         2- userId: id of the user that is loading
  // @returns self <void> */

  emitOnLoading(loading: boolean, userId: any) {
    return this.socket.emit('isLoading', userId, loading);
  }

  /* Function placeFile
  // Params: 1- name: name of the file
  //         2- type: type of the file ('pdf','img')
  //         3- file: file to be set on the database
  // Functions: 1- Set on Database
                2- Emits to all users name of the pdfFile to be
                downloaded in addition to totalPages
  // @returns Promise<any> */

  placeFile(name: string, type: 'pdf' | 'img', file: any, totalPages?: number) {
    return this.storage
      .ref(`/${type}/${name}`)
      .put(file)
      .then(() => {
        if (type === 'pdf') {
          this.socket.emit('pdfFile', {
            pdfName: name,
            pdfPages: totalPages,
          });
        } else {
          this.socket.emit('imageFile', name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* Function getFile
  // Params: 1- name: name of the file
  //         2- type: type of the file ('pdf','img')
  // @returns the file from database */

  getFile(name: string, type: 'pdf' | 'img'): Promise<any> {
    return new Promise<any>((resolve) => {
      this.storage
        .ref(`/${type}/${name}`)
        .getDownloadURL()
        .toPromise()
        .then((data) => {
          if (data) {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.open('GET', data);
            xhr.send();
            resolve(data);
          }
        });
    });
  }
}
