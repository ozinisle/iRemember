import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatrixCommunicationChannelEncryptionService } from '../services/matrix-communication-channel-encryption.service';
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
    const encryptedRequest = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Encrypt(request);
    return this.http.post<any>(url, encryptedRequest);
  }

  doUnencryptedGet(url: string): Observable<any> {
    return this.http.get(url);
  }
}
