import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { MatrixConstants } from '../constants/matrix.constants';
import { MatrixCommunicationChannelEncryptionService } from './matrix-communication-channel-encryption.service';
import { MatrixHttpService } from './matrix-http.service';
const TOKEN_KEY = 'access_token';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = environment.url;
    user = null;
    authenticationState = new BehaviorSubject(false);
    constructor(private matHttp: MatrixHttpService,
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
    register(credentials) {
        return this.matHttp.doPost(`${this.url}/api/register`, credentials).pipe(
            catchError(e => {
                this.showAlert(e.error.msg);
                throw new Error(e);
            })
        );
    }
    login(credentials) {
        return this.matHttp.doPost(MatrixConstants.url.apiUrl + MatrixConstants.url.authenticationUrl,
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
        this.matHttp.doPost(MatrixConstants.url.apiUrl + MatrixConstants.url.signOutUrl, {}).subscribe(
            (data) => {
                console.warn('User\'s session has been signed out');
            }
        );
        this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }
    // getSpecialData() {
    // return this.matHttp.get(`${this.url}/api/special`).pipe(
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