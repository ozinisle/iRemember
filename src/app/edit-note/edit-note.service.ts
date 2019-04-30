import { Injectable } from '@angular/core';
import { ApiInteractionGatewayService } from 'src/shared/api-interaction-gateway/api-interaction-gateway.service';
import { IRemember } from 'src/shared/constants/i-remember.constants';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/shared/services/auth.service';
import { GenericResponseModelInterface } from 'src/shared/models/interfaces/generic-items.interface';
import { Observable } from 'rxjs';
import { NoteItemInterface } from 'src/shared/models/interfaces/note-item.interface';

@Injectable({
  providedIn: 'root'
})
export class EditNoteService {

  constructor(private httpGateway: ApiInteractionGatewayService,
    private authService: AuthService) { }

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


}
