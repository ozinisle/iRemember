import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

import { MatrixCommunicationChannelEncryptionService } from './matrix-communication-channel-encryption.service';
import { MatrixErrorHandlerService } from '../../shared/services/matrix-error-handler.service';
import { MatrixRegistrationRequestModelInterface } from '../models/interfaces/registration-model.interface';
import { OpenSSLCommTransactionInterface } from '../models/interfaces/matrix-message-security.interface';
import { IRemember } from '../constants/i-remember.constants';
import { ApiInteractionGatewayService } from '../api-interaction-gateway/api-interaction-gateway.service';
@Injectable()
export class AuthenticationService {
    private userAuthenticated: boolean = false;
    public currentUserName: string = '';
    constructor(private http: ApiInteractionGatewayService, private router: Router,
        private commChannelEncryptor: MatrixCommunicationChannelEncryptionService,
        private errorHandler: MatrixErrorHandlerService) { }
    public setUserAuthenticated(userAuthenticated: boolean): AuthenticationService {
        this.userAuthenticated = userAuthenticated;
        return this;
    }
    public isUserAuthenticated(): boolean {
        return this.userAuthenticated;
    }
    registerUser(request: MatrixRegistrationRequestModelInterface): Observable<OpenSSLCommTransactionInterface> {
        return this.http.doPost(IRemember.apiEndPoints.registrationUrl, request);
    }
    login(username: string, password: string): Observable<any> {
        return this.http.doPost(IRemember.apiEndPoints.authenticationUrl,
            { username: username, password: password })
            .pipe(map(encryptedUser => {
                try {
                    const user = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Decrypt(encryptedUser);
                    // login successful if there's a jwt token in the response
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem(IRemember.commonTerms.currentUser, JSON.stringify(user));
                        this.setUserAuthenticated(true);
                        this.currentUserName = user.authenticatedUserName;
                    }
                    return user;
                } catch (error) {
                    this.errorHandler.handleError(error);
                }
            }));
    }
    logout() {
        // remove user from local storage to log user out
        this.http.doPost(IRemember.apiEndPoints.signOutUrl, {}).subscribe(
            (data) => {
                console.warn('User\'s session has been signed out');
            }
        );
        localStorage.removeItem(IRemember.commonTerms.currentUser);
        this.router.navigate([IRemember.apiEndPoints.loginUrl]);
        this.userAuthenticated = false;
        this.currentUserName = '';
    }
}