import { Component, OnInit } from '@angular/core';
import { NoteItemInterface } from '../../shared/models/interfaces/note-item.interface';
import { ActivatedRoute } from '@angular/router';
import { NoteItem } from '../../shared/models/note-item.model';
import { MatrixErrorHandlerService } from 'src/shared/services/matrix-error-handler.service';
import { ViewNoteResolverData } from 'src/shared/models/resolver-data.model';
import { NoteListService } from '../list/note-list.service';
import { MatrixCommunicationChannelEncryptionService } from 'src/shared/services/matrix-communication-channel-encryption.service';
import { IRemember } from 'src/shared/constants/i-remember.constants';
@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {

  public note: NoteItemInterface = new NoteItem();

  constructor(private activatedRoute: ActivatedRoute,
    private errorHandler: MatrixErrorHandlerService,
    private noteListService: NoteListService,
    private commChannelEncryptor: MatrixCommunicationChannelEncryptionService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    try {
      // const viewNoteResolverData: ViewNoteResolverDataInterface = this.activatedRoute.snapshot.data.viewNoteResolverData;
      const viewNoteResolverData: ViewNoteResolverData = new ViewNoteResolverData();
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
      viewNoteResolverData.setNote(lastSelectedNote);
      this.note = Object.assign(Object.create(new NoteItem()), viewNoteResolverData.getNote());
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
