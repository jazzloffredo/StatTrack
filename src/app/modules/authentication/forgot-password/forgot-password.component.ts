import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegistrationValidator } from '../register/registration.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  passwordMatch = false;

  resetForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.resetForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(32)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
        validator: RegistrationValidator.validate.bind(this)
      });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.authService.updatePassword(this.username, this.newPassword);
    }
  }

  get username() {
    return this.resetForm.get('username').value;
  }

  get newPassword() {
    return this.resetForm.get('newPassword').value;
  }
}
