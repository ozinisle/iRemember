import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatrixCommunicationChannelEncryptionService } from '../services/matrix-communication-channel-encryption.service';
import { map } from "rxjs/operators";
import { OpenSSLCommTransactionInterface } from '../models/interfaces/matrix-message-security.interface';

// import { Http } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiInteractionGatewayService {

  constructor(private http: HttpClient,
    private commChannelEncryptor: MatrixCommunicationChannelEncryptionService) { }

  doGet(url: string): Observable<any> {
    return this.http.get(url);
  }

  doPut(url: string, request: any): Observable<any> {
    const encryptedRequest = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Encrypt(request);
    return this.http.put<any>(url, encryptedRequest);
  }

  doDelete(url: string): Observable<any> {
    return this.http.delete(url);
  }


  doPost(url: string, request: any): Observable<any> {
    console.log(request)
    const encryptedRequest = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Encrypt(request);
    return this.http.post(url, encryptedRequest).pipe(map(response => {
      const decryptedResponse = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Decrypt(<OpenSSLCommTransactionInterface>response);
      // console.log("response = " + JSON.stringify(decryptedResponse));
      console.log(decryptedResponse)
      return decryptedResponse;
    }));
  }

  doUnencryptedGet(url: string): Observable<any> {
    return this.http.get(url);
  }
}
