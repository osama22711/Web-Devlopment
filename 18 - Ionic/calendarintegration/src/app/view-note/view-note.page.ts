import { Note } from 'src/modals/note.modal';
import { NoteServiceService } from './../note-service.service';
import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {
  note: Note;

  constructor(private noteSerivce: NoteServiceService, private navParams: NavParams, private router: Router) {
    this.note = this.navParams.get('noteId');
   }

  ngOnInit() {
  }

  deleteNote(createDate: number) {
    this.noteSerivce.deleteNote(createDate);
    this.router.navigate(['/home']);
  }
}
