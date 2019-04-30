import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatrixCommunicationChannelEncryptionService } from '../services/matrix-communication-channel-encryption.service';
import { map } from "rxjs/operators";
import { OpenSSLCommTransactionInterface } from '../models/interfaces/matrix-message-security.interface';
import { AuthService } from '../services/auth.service';
import { IRemLoginResponseInterface } from 'src/app/login/model/interface/loginResponse.interface';

// import { Http } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiInteractionGatewayService {

  constructor(private http: HttpClient,
    private commChannelEncryptor: MatrixCommunicationChannelEncryptionService) { }

  doGet(url: string, options?: any): Observable<any> {
    return this.http.get(url, {
      headers: this.getRequestOptionArgs(options),
    });
  }

  doPut(url: string, request: any, options?: any): Observable<any> {
    const encryptedRequest = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Encrypt(request);
    return this.http.put<any>(url, encryptedRequest, {
      headers: this.getRequestOptionArgs(options),
    });
  }

  doDelete(url: string, options?: any): Observable<any> {
    return this.http.delete(url, {
      headers: this.getRequestOptionArgs(options),
    });
  }


  doPost(url: string, request: any, options?: any): Observable<any> {
    console.log(request);

    const encryptedRequest = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Encrypt(request);

    return this.http.post(url, encryptedRequest, {
      headers: this.getRequestOptionArgs(options),
    }).pipe(map(response => {
      const decryptedResponse = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Decrypt(<OpenSSLCommTransactionInterface>response);
      // console.log("response = " + JSON.stringify(decryptedResponse));
      console.log(decryptedResponse)
      return decryptedResponse;
    }));
  }

  doUnencryptedGet(url: string, options?: any): Observable<any> {
    return this.http.get(url, {
      headers: this.getRequestOptionArgs(options),
    });
  }

  private getRequestOptionArgs(param_options?) {
    let httpHeader: HttpHeaders;
    const currentUser: IRemLoginResponseInterface = JSON.parse(sessionStorage.getItem('current_user'));
    const token: string = currentUser ? currentUser.token : null;

    if (param_options) {
      if (token) {
        param_options["Authorization"] = `Bearer ${token}`;
        param_options["Content-Type"] = "application/json";
      } else {
        param_options["Content-Type"] = "application/json";
      }
      httpHeader = new HttpHeaders(param_options);
    } else {
      if (token) {
        httpHeader = new HttpHeaders({
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8"
        });
      }
    }

    return httpHeader;
  }
}
