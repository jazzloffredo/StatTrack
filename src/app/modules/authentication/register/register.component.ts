import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationValidator } from './registration.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  passwordMatch = false;

  registerForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(32)]],
      lastName: ['', [Validators.required, Validators.maxLength(32)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      email: ['', [Validators.required, Validators.maxLength(64), Validators.email]],
      passwordForm: this.passwordForm
    });
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordForm.valid) {
      console.warn(this.registerForm.value);
    }
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.passwordForm.get('password');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }
}
