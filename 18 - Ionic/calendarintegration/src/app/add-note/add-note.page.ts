import { Note } from 'src/modals/note.modal';
import { NoteServiceService } from './../note-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  formGroup: FormGroup;
  note: Note;
  date: Date = new Date();
  title = '';
  content = '';

  constructor(private noteService: NoteServiceService, private router: Router) {
    this.formGroup = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
      date: new FormControl(),
    });
   }

  ngOnInit() {
  }

  saveNote(note: Note) {
    this.noteService.saveNote(note);
    this.router.navigate(['/home']);
  }

}
