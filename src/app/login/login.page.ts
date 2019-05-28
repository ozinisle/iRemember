import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatrixCommunicationChannelEncryptionService } from 'src/shared/services/matrix-communication-channel-encryption.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IRemember } from 'src/shared/constants/i-remember.constants';
import { MatrixErrorHandlerService } from 'src/shared/services/matrix-error-handler.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public credentialsForm: FormGroup;
  public rememberMeChkBox: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private commChannelEncryptor: MatrixCommunicationChannelEncryptionService,
    private router: Router,
    private toastController: ToastController,
    private errorHandler: MatrixErrorHandlerService) { }
  ngOnInit() {
    try {
      this.credentialsForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });


      const lastAttemptedByUser = this.commChannelEncryptor.getDecryptedDataFromLocalStorage(IRemember.localStorageItems.lastLoggedInUser)
      if (lastAttemptedByUser) {
        this.credentialsForm.setValue(JSON.parse(lastAttemptedByUser));

        this.rememberMeChkBox = true;
      } else {
        localStorage.setItem(IRemember.localStorageItems.lastLoggedInUser, null);
      }

    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  onSubmit() {
    try {
      let toast = this.toastController.create({
        message: IRemember.messages.sendingVerificationCode,
        duration: 1000,
        position: 'bottom'
      });
      this.authService.login(this.credentialsForm.value).subscribe(loginResponse => {
        //console.log(loginResponse)
        if (loginResponse.isAuthenticated) {
          //this.router.navigateByUrl('/home');

          toast = this.toastController.create({
            message: IRemember.messages.youAreLoggedIn,
            duration: 1000,
            position: 'bottom'
          });

          toast.then(done => done.present());

          const decryptedTargetRoute = this.commChannelEncryptor.getDecryptedDataFromSessionStorage(IRemember.sessionStorageItems.loginAndFallBack);
          if (decryptedTargetRoute) {
            this.router.navigateByUrl(decryptedTargetRoute);
            sessionStorage.setItem(IRemember.sessionStorageItems.loginAndFallBack, null);
          } else {
            this.router.navigateByUrl('/home')
          }
        } else {

          toast = this.toastController.create({
            message: IRemember.messages.authenticationFailedMessage,
            duration: 1000,
            position: 'bottom'
          });

          toast.then(done => done.present());
        }
      });
      this.rememberMe();
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  register() {
    try {
      this.authService.register(this.credentialsForm.value).subscribe(res => {
        // Call Login to automatically login the new user
        this.authService.login(this.credentialsForm.value).subscribe();
      });
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  private rememberMe() {
    try {
      if (this.rememberMeChkBox) {
        const rememberUser: JSON = <JSON><unknown>{
          "username": this.credentialsForm.value.username + '',
          "password": this.credentialsForm.value.password + ''
        }

        this.commChannelEncryptor.setEncryptedDataInLocalStorage(IRemember.localStorageItems.lastLoggedInUser, JSON.stringify(rememberUser));
      }
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
