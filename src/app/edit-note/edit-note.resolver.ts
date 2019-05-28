import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { NoteListService } from '../list/note-list.service';
import { EditNoteResolverDataInterface } from 'src/shared/models/interfaces/resolver-data.interface';
import { NoteItemInterface } from 'src/shared/models/interfaces/note-item.interface';
import { NoteItem } from '../../shared/models/note-item.model';
import { EditNoteResolverData } from '../../shared/models/resolver-data.model';
@Injectable()
export class EditNoteResolver<T> implements Resolve<Promise<EditNoteResolverDataInterface>> {
    constructor(private noteListService: NoteListService) { }
    async resolve(): Promise<EditNoteResolverDataInterface> {
        try {
            const editNoteResolverData: EditNoteResolverDataInterface = new EditNoteResolverData();
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
            editNoteResolverData.setNote(lastSelectedNote);
            return await Promise.resolve(editNoteResolverData);
        } catch (exception) {
        }
        return null;
    }
}