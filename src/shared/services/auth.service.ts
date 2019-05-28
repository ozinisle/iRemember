import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { MatrixCommunicationChannelEncryptionService } from './matrix-communication-channel-encryption.service';
import { ApiInteractionGatewayService } from '../api-interaction-gateway/api-interaction-gateway.service';
import { IRemember } from '../constants/i-remember.constants';
import { MatrixRegistrationRequestModelInterface } from '../models/interfaces/registration-model.interface';
import { environment } from 'src/environments/environment';
import { IRemLoginResponseModel } from 'src/app/login/model/loginResponse.model';
import { IRemLoginResponseInterface } from 'src/app/login/model/interface/loginResponse.interface';
import { Router } from '@angular/router';

const TOKEN_KEY = 'access_token';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user: IRemLoginResponseInterface = null;
    public authenticationState = new BehaviorSubject(false);

    constructor(private httpGateway: ApiInteractionGatewayService,
        private helper: JwtHelperService,
        private storage: Storage,
        private plt: Platform,
        private alertController: AlertController,
        private commChannelEncryptor: MatrixCommunicationChannelEncryptionService,
        private router: Router) {
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }

    public getUser(): IRemLoginResponseInterface {
        if (!this.user && sessionStorage.getItem('current_user')) {
            this.user = JSON.parse(sessionStorage.getItem('current_user'))
        }
        return this.user;
    }

    public setUser(user: IRemLoginResponseInterface): AuthService {
        this.user = user;
        return this;
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
                this.showAlert(e.error && e.error.msg ? e.error.msg : e.message);
                throw new Error(e);
            })
        );
    }

    sendVerificationMail(credentials: MatrixRegistrationRequestModelInterface) {
        return this.httpGateway.doPost(IRemember.apiEndPoints.sendVerificationEmail,
            credentials)
            .pipe(
                catchError(e => {
                    this.showAlert(e.error && e.error.msg ? e.error.msg : e.message);
                    throw new Error(e);
                })
            );
    }

    login(credentials: MatrixRegistrationRequestModelInterface): Observable<IRemLoginResponseInterface> {
        return this.httpGateway.doPost(IRemember.apiEndPoints.login,
            credentials)
            .pipe(
                tap(user => {
                    // const user = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Decrypt(encryptedUser);
                    // // login successful if there's a jwt token in the response
                    // if (user && user.token) {
                    //     this.storage.set(TOKEN_KEY, user['token']);
                    //     this.user = this.helper.decodeToken(user['token']);
                    //     this.authenticationState.next(true);
                    // }

                    this.setUser(user);

                    sessionStorage.setItem('current_user', JSON.stringify(user));

                    return user;
                }),
                catchError(e => {
                    this.setUser(null);
                    sessionStorage.setItem('current_user', null);
                    this.showAlert(e.error && e.error.msg ? e.error.msg : e.message);
                    throw new Error(e);
                })
            );
    }

    logout() {
        this.setUser(null);
        sessionStorage.setItem('current_user', null);
        sessionStorage.setItem('irem-target-route', null);
        console.warn('User\'s session has been signed out');
        this.router.navigateByUrl('./home');
        this.httpGateway.doPost(IRemember.apiEndPoints.signOutUrl, {}).subscribe(
            (data) => {
                console.log('signout response >>>', data);
            }
        );
        // this.storage.remove(TOKEN_KEY).then(() => {
        //     this.authenticationState.next(false);
        // });
    }

    isAuthenticated(): boolean {
        const user: IRemLoginResponseInterface = this.getUser();
        return user ? user.isAuthenticated.toUpperCase() === "TRUE" : false;
        //return this.authenticationState.value;
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