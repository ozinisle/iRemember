import { Injectable } from '@angular/core';
import { ApiInteractionGatewayService } from 'src/shared/api-interaction-gateway/api-interaction-gateway.service';
import { IRemember } from 'src/shared/constants/i-remember.constants';
import { catchError, tap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/shared/services/auth.service';
import { GenericResponseModelInterface } from 'src/shared/models/interfaces/generic-items.interface';
import { Observable, of } from 'rxjs';
import { NoteItemInterface } from 'src/shared/models/interfaces/note-item.interface';
import { GetNoteCategoryIconNamesResponseInterface } from './model/interface/get-note-category-icon-names-response.interface';
import { MatrixCommunicationChannelEncryptionService } from 'src/shared/services/matrix-communication-channel-encryption.service';
import { GetNoteCategoryDataResponseInterface } from './model/interface/get-note-category-data-response.interface';

@Injectable({
  providedIn: 'root'
})
export class EditNoteService {

  constructor(private httpGateway: ApiInteractionGatewayService,
    private authService: AuthService,
    private commChannelEncryptor: MatrixCommunicationChannelEncryptionService) { }

  public updateNode(credentials: NoteItemInterface): Observable<GenericResponseModelInterface> {
    return this.httpGateway.doPost(IRemember.apiEndPoints.iRemUpdateNote,
      credentials)
      .pipe(
        catchError(e => {
          this.authService.showAlert(e.error && e.error.msg ? e.error.msg : e.message);
          throw new Error(e);
        })
      );
  }

  public getCategoryTagData(): Observable<GetNoteCategoryDataResponseInterface> {
    let categoryTagData =  this.commChannelEncryptor.getDecryptedDataFromSessionStorage("irem-category-tag-data");
    if (categoryTagData) {
      return of(JSON.parse(categoryTagData));
    } else {
      return this.httpGateway.doUnencryptedGet('/assets/data/notes-category-tag.data.json')
        .pipe(
          tap(
            data => {
              if (data) {
                this.commChannelEncryptor.setEncryptedDataInSessionStorage("irem-category-tag-data", JSON.stringify(data));
                return data;
              }
            }
          ),
          catchError(e => {
            //this.showAlert(e.error && e.error.msg ? e.error.msg : e.message);
            throw new Error(e);
          })
        );

    }
  }

  public getCategoryIconNames(): Observable<GetNoteCategoryIconNamesResponseInterface> {
    let categoryIconNames = this.commChannelEncryptor.getDecryptedDataFromSessionStorage("irem-category-icon-names");
    if (categoryIconNames) {
      return of(JSON.parse(categoryIconNames));
    } else {
      return this.httpGateway.doUnencryptedGet('/assets/data/ionic-icon-names.data.json').pipe(tap(data => {
        if (data) {
          this.commChannelEncryptor.setEncryptedDataInSessionStorage("irem-category-icon-names", JSON.stringify(data));
          return data;
        }
      },
        catchError(e => {
          //this.showAlert(e.error && e.error.msg ? e.error.msg : e.message);
          throw new Error(e);
        })));
    }
  }


}
