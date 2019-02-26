import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiInteractionGatewayService {

  constructor(private http: HttpClient) { }

  doGet(url: string): Observable<any> {
    return this.http.get(url);
  }
}
