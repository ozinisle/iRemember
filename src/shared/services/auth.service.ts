import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { MatrixCommunicationChannelEncryptionService } from './matrix-communication-channel-encryption.service';
import { ApiInteractionGatewayService } from '../api-interaction-gateway/api-interaction-gateway.service';
import { IRemember } from '../constants/i-remember.constants';
import { MatrixRegistrationRequestModelInterface } from '../models/interfaces/registration-model.interface';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'access_token';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = null;
    authenticationState = new BehaviorSubject(false);
    constructor(private httpGateway: ApiInteractionGatewayService,
        private helper: JwtHelperService,
        private storage: Storage,
        private plt: Platform,
        private alertController: AlertController,
        private commChannelEncryptor: MatrixCommunicationChannelEncryptionService) {
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }
    checkToken() {
        this.storage.get(TOKEN_KEY).then(token => {
            if (token) {
                const decoded = this.helper.decodeToken(token);
                const isExpired = this.helper.isTokenExpired(token);
                if (!isExpired) {
                    this.user = decoded;
                    this.authenticationState.next(true);
                } else {
                    this.storage.remove(TOKEN_KEY);
                }
            }
        });
    }
    register(credentials: MatrixRegistrationRequestModelInterface) {
        credentials.appName = environment.appName;
        return this.httpGateway.doPost(IRemember.apiEndPoints.register, credentials).pipe(
            catchError(e => {
                this.showAlert(e.error.msg);
                throw new Error(e);
            })
        );
    }
    login(credentials: MatrixRegistrationRequestModelInterface) {
        return this.httpGateway.doPost(IRemember.apiEndPoints.login,
            credentials)
            .pipe(
                tap(encryptedUser => {
                    const user = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Decrypt(encryptedUser);
                    // login successful if there's a jwt token in the response
                    if (user && user.token) {
                        this.storage.set(TOKEN_KEY, user['token']);
                        this.user = this.helper.decodeToken(user['token']);
                        this.authenticationState.next(true);
                    }
                    return user;
                }),
                catchError(e => {
                    this.showAlert(e.error.msg);
                    throw new Error(e);
                })
            );
    }
    logout() {
        this.httpGateway.doPost(IRemember.apiEndPoints.signOutUrl, {}).subscribe(
            (data) => {
                console.warn('User\'s session has been signed out');
            }
        );
        this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }
    // getSpecialData() {
    // return this.httpGateway.get(`${this.url}/api/special`).pipe(
    // catchError(e => {
    // const status = e.status;
    // if (status === 401) {
    // this.showAlert('You are not authorized for this!');
    // this.logout();
    // }
    // throw new Error(e);
    // })
    // )
    // }
    isAuthenticated() {
        return this.authenticationState.value;
    }
    showAlert(msg) {
        const alert = this.alertController.create({
            message: msg,
            header: 'Error',
            buttons: ['OK']
        });
        alert.then(_alert => _alert.present());
    }
}