import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { NoteListService } from '../list/note-list.service';
import { NoteItemInterface } from 'src/shared/models/interfaces/note-item.interface';
import { NoteItem } from 'src/shared/models/note-item.model';

@Injectable()
export class NewNoteResolver<T> implements Resolve<Promise<NoteItemInterface>> {
    constructor(private noteListService: NoteListService) { }

    async resolve(): Promise<NoteItemInterface> {

        try {
            let lastSelectedNote: NoteItemInterface = this.noteListService.getLastSelectedNote();
            if (lastSelectedNote) {
                if (sessionStorage) {
                    sessionStorage.setItem('last-selected-note-item', JSON.stringify(lastSelectedNote));
                }
            } else {
                if (sessionStorage) {
                    lastSelectedNote = Object.assign(Object.create(new NoteItem()),
                        JSON.parse(sessionStorage.get('last-selected-note-item')));
                }
            }
            return await Promise.resolve(lastSelectedNote);
        } catch (exception) {

        }
        return null;
    }
}
