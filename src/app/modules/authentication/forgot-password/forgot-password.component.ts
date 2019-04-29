import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

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

  modalClassSuccess = 'modal';
  modalClassFailure = 'modal';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService) {
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
      this.spinner.show();
      this.authService.updatePassword(this.username, this.newPassword)
        .subscribe(() => {
          this.resetForm.reset();
          this.spinner.hide();
          this.showUpdateSuccessPopup();
        }, (err: HttpErrorResponse) => {
            console.log(err);
            this.spinner.hide();
            if (err.error.message === 'Update failed.') {
              this.showUpdateFailurePopup();
            }
        });
    }
  }

  showUpdateSuccessPopup() {
    this.modalClassSuccess = 'modal is-active';
  }

  hideRegisterSuccessPopup() {
    this.modalClassSuccess = 'modal';
    this.router.navigate(['/auth']);
  }

  showUpdateFailurePopup() {
    this.modalClassFailure = 'modal is-active';
  }

  hideRegisterFailurePopup() {
    this.modalClassFailure = 'modal';
    this.router.navigate(['/auth/reset-password']);
  }

  get username() {
    return this.resetForm.get('username').value;
  }

  get newPassword() {
    return this.resetForm.get('password').value;
  }
}
