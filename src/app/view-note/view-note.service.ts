import { Injectable } from '@angular/core';
import { ApiInteractionGatewayService } from 'src/shared/api-interaction-gateway/api-interaction-gateway.service';
import { AuthService } from 'src/shared/services/auth.service';
import { MatrixCommunicationChannelEncryptionService } from 'src/shared/services/matrix-communication-channel-encryption.service';
import { GenericResponseModelInterface } from 'src/shared/models/interfaces/generic-items.interface';
import { Observable } from 'rxjs';
import { IRemember } from 'src/shared/constants/i-remember.constants';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewNoteService {

  constructor(private httpGateway: ApiInteractionGatewayService,
    private authService: AuthService,
    private commChannelEncryptor: MatrixCommunicationChannelEncryptionService) { }

}
