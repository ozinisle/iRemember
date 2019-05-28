import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatrixRegistrationRequestModelInterface } from '../../shared/models/interfaces/registration-model.interface';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentialsForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastController: ToastController, private router: Router) { }
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    const registrationData: MatrixRegistrationRequestModelInterface = this.credentialsForm.value;
    let toast = this.toastController.create({
      message: "Registering User ....",
      duration: 10000,
      position: 'bottom'
    });

    toast.then(done => done.present())

    this.authService.register(registrationData).subscribe(res => {
      // const registrationResponse = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Decrypt(res);
      // Call Login to automatically login the new user
      // this.authService.login(this.credentialsForm.value).subscribe();

      if (res.responseCode === "1904170010003") {
        toast = this.toastController.create({
          message: res.displayMessage,
          duration: 1000,
          position: 'bottom'
        });

        toast.then(done => done.present());
      } else {
        toast = this.toastController.create({
          message: res.displayMessage,
          duration: 10000,
          position: 'bottom'
        });
        toast.then(done => {
          done.present();
          this.router.navigate(['/home']);
        });

      }
    });
  }

}


