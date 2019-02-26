import { Injectable } from '@angular/core';
import { NoteItemInterface } from 'src/shared/models/interfaces/note-item.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  private lastSelectedNote: NoteItemInterface = null;
  constructor() { }

  public getLastSelectedNote(): NoteItemInterface {
    return this.lastSelectedNote;
  }

  public setLastSelectedNote(lastSelectedNote: NoteItemInterface): NoteListService {
    this.lastSelectedNote = lastSelectedNote;
    return this;
  }
}
