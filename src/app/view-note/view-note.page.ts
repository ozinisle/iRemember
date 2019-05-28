import { Component, OnInit } from '@angular/core';
import { NoteItemInterface } from '../../shared/models/interfaces/note-item.interface';
import { ActivatedRoute } from '@angular/router';
import { NoteItem } from '../../shared/models/note-item.model';
import { ViewNoteResolverDataInterface } from '../../shared/models/interfaces/resolver-data.interface';
@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {


  public note: NoteItemInterface;
  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    const viewNoteResolverData: ViewNoteResolverDataInterface = this.activatedRoute.snapshot.data.viewNoteResolverData;
    this.note = Object.assign(Object.create(new NoteItem()), viewNoteResolverData.getNote());
  }
}
