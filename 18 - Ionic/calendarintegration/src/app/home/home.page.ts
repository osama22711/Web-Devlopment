import { Note } from './../../modals/note.modal';
import { NoteServiceService } from './../note-service.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private note: Note;

  private notes: Promise<Note[]>;

  constructor(private route: ActivatedRoute,
     public router: Router, private noteService: NoteServiceService, public navCtrl: NavController) {}

  ionViewWillEnter() {
    this.notes = this.getAllNotes();
    console.log(this.notes);
  }

  addNote() {
    this.router.navigate(['/add-note']);
  }

  getNote(createDate: number) {
    this.noteService.getNote(createDate).then(n => {
      this.note = n;
      this.router.navigate(['/', 'view-note', this.note]);
    });
  }

  getAllNotes() {
    return this.noteService.getAllNotes();
  }
}
