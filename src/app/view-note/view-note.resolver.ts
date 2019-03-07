import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { NoteListService } from '../list/note-list.service';
import { NoteItemInterface } from '../../shared/models/interfaces/note-item.interface';
import { NoteItem } from '../../shared/models/note-item.model';
import { ViewNoteResolverData } from '../../shared/models/resolver-data.model';
import { ViewNoteResolverDataInterface } from '../../shared/models/interfaces/resolver-data.interface';
@Injectable()
export class ViewNoteResolver<T> implements Resolve<Promise<ViewNoteResolverDataInterface>> {
    constructor(private noteListService: NoteListService) { }
    async resolve(): Promise<ViewNoteResolverDataInterface> {
        try {
            const viewNoteResolverData: ViewNoteResolverData = new ViewNoteResolverData();
            let lastSelectedNote: NoteItemInterface = this.noteListService.getLastSelectedNote();
            if (lastSelectedNote) {
                if (sessionStorage) {
                    sessionStorage.setItem('last-selected-note-item', JSON.stringify(lastSelectedNote));
                }
            } else {
                if (sessionStorage) {
                    lastSelectedNote = Object.assign(Object.create(new NoteItem()),
                        JSON.parse(sessionStorage.getItem('last-selected-note-item')));
                }
            }
            viewNoteResolverData.setNote(lastSelectedNote);
            return await Promise.resolve(viewNoteResolverData);
        } catch (exception) {
            throw exception;
        }
        return null;
    }
}
