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

    public isAuthenticatedUser() {
        let authFlag: boolean = false;
        if (this.user) {
            authFlag = this.user.isAuthenticated === "true";
        }
        return authFlag;
    }

    public getUser(): IRemLoginResponseInterface {
        const currentUserData = this.commChannelEncryptor.getDecryptedDataFromSessionStorage(IRemember.sessionStorageItems.currentUserData);
        if (!this.user && currentUserData) {
            this.user = JSON.parse(currentUserData);
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
                    this.setUser(user);
                    this.commChannelEncryptor.setEncryptedDataInSessionStorage(IRemember.sessionStorageItems.currentUserData, JSON.stringify(user));
                    return user;
                }),
                catchError(e => {
                    this.setUser(null);
                    sessionStorage.setItem(IRemember.sessionStorageItems.currentUserData, null);
                    this.showAlert(e.error && e.error.msg ? e.error.msg : e.message);
                    throw new Error(e);
                })
            );
    }

    logout(credentials?: MatrixRegistrationRequestModelInterface) {
        this.setUser(null);
        sessionStorage.setItem(IRemember.sessionStorageItems.currentUserData, null);
        sessionStorage.setItem(IRemember.sessionStorageItems.loginAndFallBack, null);
        console.warn(IRemember.messages.signedOutMessage);

        this.httpGateway.doPost(IRemember.apiEndPoints.signOutUrl, credentials).subscribe(
            (data) => {
                console.log('signout response >>>', data);
                //this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => this.router.navigate(['/home']));
                window.location.reload();
            }
            , (err) => {
                console.log('signout response >>> ' + err.message);
                //this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => this.router.navigate(['/home']));
                window.location.reload();
            }, () => {
                // this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => this.router.navigate(['/home']));
                window.location.reload();
            });
    }

    isAuthenticated(): boolean {
        const user: IRemLoginResponseInterface = this.getUser();
        return user ? user.isAuthenticated.toUpperCase() === "TRUE" : false;
    }

    showAlert(msg) {
        const alert = this.alertController.create({
            message: IRemember.messages.servicesDownMessage,// msg,
            header: 'OOPS',
            buttons: ['OK']
        });
        alert.then(_alert => _alert.present());
        console.error(msg);
    }
}