import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationValidator } from './registration.validator';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  passwordMatch = false;

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(32)]],
      lastName: ['', [Validators.required, Validators.maxLength(32)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      email: ['', [Validators.required, Validators.maxLength(64), Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
        validator: RegistrationValidator.validate.bind(this)
      });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.warn(this.registerForm.value);
      this.authService.registerUser(this.firstName, this.lastName, this.username, this.email, this.password)
        .subscribe(() => {
          console.log('success');
        });
    }
  }

  get firstName() {
    return this.registerForm.get('firstName').value;
  }

  get lastName() {
    return this.registerForm.get('lastName').value;
  }

  get username() {
    return this.registerForm.get('username').value;
  }

  get email() {
    return this.registerForm.get('email').value;
  }

  get password() {
    return this.registerForm.get('password').value;
  }
}
