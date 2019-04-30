import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatrixCommunicationChannelEncryptionService } from 'src/shared/services/matrix-communication-channel-encryption.service';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private toastController: ToastController) { }
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    const lastAttemptedByUser = localStorage.getItem('iremember-last-logged-in-user');
    if (lastAttemptedByUser) {
      var bytes = CryptoJS.AES.decrypt(lastAttemptedByUser.toString(), environment.clientOnlySecretKey);
      var plaintext = bytes.toString(CryptoJS.enc.Utf8);

      this.credentialsForm.setValue(JSON.parse(plaintext));

      this.rememberMeChkBox = true;
    }


  }
  onSubmit() {
    let toast = this.toastController.create({
      message: "Sending Verification Code ....",
      duration: 1000,
      position: 'bottom'
    });
    this.authService.login(this.credentialsForm.value).subscribe(loginResponse => {
      //console.log(loginResponse)
      if (loginResponse.isAuthenticated) {
        this.router.navigateByUrl('/home');

        toast = this.toastController.create({
          message: "You are logged in",
          duration: 1000,
          position: 'bottom'
        });

        toast.then(done => done.present());
      } else {

        toast = this.toastController.create({
          message: "Authentication failed",
          duration: 1000,
          position: 'bottom'
        });

        toast.then(done => done.present());
      }
    });
    this.rememberMe();
  }
  register() {
    this.authService.register(this.credentialsForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      this.authService.login(this.credentialsForm.value).subscribe();
    });
  }
  private rememberMe() {

    if (this.rememberMeChkBox) {
      const rememberUser: JSON = <JSON><unknown>{
        "username": this.credentialsForm.value.username + '',
        "password": this.credentialsForm.value.password + ''
      }

      localStorage.setItem('iremember-last-logged-in-user',
        CryptoJS.AES.encrypt(JSON.stringify(rememberUser), environment.clientOnlySecretKey));
    }
  }
}
