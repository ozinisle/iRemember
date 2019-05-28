import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { NoteListService } from '../list/note-list.service';
import { EditNoteResolverDataInterface } from 'src/shared/models/interfaces/resolver-data.interface';
import { NoteItemInterface } from 'src/shared/models/interfaces/note-item.interface';
import { NoteItem } from '../../shared/models/note-item.model';
import { EditNoteResolverData } from '../../shared/models/resolver-data.model';
import { IRemember } from 'src/shared/constants/i-remember.constants';
import { MatrixCommunicationChannelEncryptionService } from 'src/shared/services/matrix-communication-channel-encryption.service';
import { MatrixErrorHandlerService } from 'src/shared/services/matrix-error-handler.service';
@Injectable()
export class EditNoteResolver<T> implements Resolve<Promise<EditNoteResolverDataInterface>> {
    constructor(private noteListService: NoteListService,
        private commChannelEncryptor: MatrixCommunicationChannelEncryptionService,
        private errorHandler: MatrixErrorHandlerService) { }
    async resolve(): Promise<EditNoteResolverDataInterface> {
        try {
            const editNoteResolverData: EditNoteResolverDataInterface = new EditNoteResolverData();
            let lastSelectedNote: NoteItemInterface = this.noteListService.getLastSelectedNote();
            if (lastSelectedNote) {
                if (sessionStorage) {
                    this.commChannelEncryptor.setEncryptedDataInSessionStorage(IRemember.sessionStorageItems.lastSelectedNoteItem, JSON.stringify(lastSelectedNote))
                }
            } else {
                if (sessionStorage) {
                    lastSelectedNote = Object.assign(Object.create(new NoteItem()),
                        this.commChannelEncryptor.getDecryptedDataFromSessionStorage(IRemember.sessionStorageItems.lastSelectedNoteItem));
                }
            }
            editNoteResolverData.setNote(lastSelectedNote);
            return await Promise.resolve(editNoteResolverData);
        } catch (error) {
            this.errorHandler.handleError(error);
        }
        return null;
    }
}