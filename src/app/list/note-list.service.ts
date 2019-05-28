import { Injectable } from '@angular/core';
import { NoteItemInterface } from '../../shared/models/interfaces/note-item.interface';
import { ApiInteractionGatewayService } from 'src/shared/api-interaction-gateway/api-interaction-gateway.service';
import { AuthService } from 'src/shared/services/auth.service';
import { MatrixCommunicationChannelEncryptionService } from 'src/shared/services/matrix-communication-channel-encryption.service';
import { GenericResponseModelInterface } from 'src/shared/models/interfaces/generic-items.interface';
import { Observable } from 'rxjs';
import { IRemember } from 'src/shared/constants/i-remember.constants';
import { catchError } from 'rxjs/operators';
import { MatrixErrorHandlerService } from 'src/shared/services/matrix-error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  private lastSelectedNote: NoteItemInterface = null;
  constructor(private httpGateway: ApiInteractionGatewayService,
    private authService: AuthService,
    private errorHandler: MatrixErrorHandlerService) { }
  public getLastSelectedNote(): NoteItemInterface {
    return this.lastSelectedNote;
  }
  public setLastSelectedNote(lastSelectedNote: NoteItemInterface): NoteListService {
    this.lastSelectedNote = lastSelectedNote;
    return this;
  }

  public getNotesList(request?): Observable<GenericResponseModelInterface> {
    try {
      return this.httpGateway.doPost(IRemember.apiEndPoints.iRemGetNotesList,
        request)
        .pipe(
          catchError(e => {
            this.authService.showAlert(e.error && e.error.msg ? e.error.msg : e.message);
            throw new Error(e);
          })
        );
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  public softDeleteNotes(idsMarkedForDeletion: string[]): Observable<GenericResponseModelInterface> {
    try {
      return this.httpGateway.doPost(IRemember.apiEndPoints.iRemSoftDeleteNotes,
        idsMarkedForDeletion)
        .pipe(
          catchError(e => {
            this.authService.showAlert(e.error && e.error.msg ? e.error.msg : e.message);
            throw new Error(e);
          })
        );
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  public hardDeleteNotes(idsMarkedForDeletion: string[]): Observable<GenericResponseModelInterface> {
    try {
      return this.httpGateway.doPost(IRemember.apiEndPoints.iRemHardDeleteNotes,
        idsMarkedForDeletion)
        .pipe(
          catchError(e => {
            this.authService.showAlert(e.error && e.error.msg ? e.error.msg : e.message);
            throw new Error(e);
          })
        );
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}