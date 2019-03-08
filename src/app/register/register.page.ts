import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatrixRegistrationRequestModelInterface } from 'src/shared/models/interfaces/registration-model.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentialsForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    const registrationData: MatrixRegistrationRequestModelInterface = this.credentialsForm.value;
    this.authService.register(registrationData).subscribe(res => {
      // Call Login to automatically login the new user
      // this.authService.login(this.credentialsForm.value).subscribe();
    });
  }

}


