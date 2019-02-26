import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteItemInterface } from 'src/shared/models/interfaces/note-item.interface';
import { NoteItem } from 'src/shared/models/note-item.model';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.page.html',
  styleUrls: ['./new-note.page.scss'],
})
export class NewNotePage implements OnInit {

  public note: NoteItemInterface;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const note = <unknown>this.activatedRoute.snapshot.data.note;
    this.note = Object.assign(Object.create(new NoteItem()), note);
  }

}
