import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public credentialsForm: FormGroup;
  public verificationMailSent = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastController: ToastController) { }
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    let toast = this.toastController.create({
      message: "Sending Verification Code ....",
      duration: 1000,
      position: 'bottom'
    });

    toast.then(done => done.present());

    this.authService.sendVerificationMail(this.credentialsForm.value).subscribe(res => {

      toast = this.toastController.create({
        message: "Verification Email Sent",
        duration: 1000,
        position: 'bottom'
      });

      toast.then(done => done.present());

    });
  }


}
