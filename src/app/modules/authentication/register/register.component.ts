import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegistrationValidator } from './registration.validator';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  private unsubscribe: Subject<boolean> = new Subject<boolean>();

  modalClass = 'modal';

  usernameExists = false;
  emailExists = false;
  passwordMatch = false;

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private router: Router,
              private curRoute: ActivatedRoute,
              private authService: AuthService) {

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
      this.spinner.show();
      this.authService.registerUser(this.firstName, this.lastName, this.username, this.email, this.password)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(() => {
          this.registerForm.reset();
          this.spinner.hide();
          this.showRegisterSuccessPopup();
        }, (err: HttpErrorResponse) => {
            console.log(err);
            this.spinner.hide();
            this.usernameExists = err.error.message === 'Username already exists.' ? true : false;
            this.emailExists = err.error.message === 'Email already exists.' ? true : false;
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  showRegisterSuccessPopup() {
    this.modalClass = 'modal is-active';
  }

  hideRegisterSuccessPopup() {
    this.modalClass = 'modal';
    console.log(this.curRoute);
    this.router.navigate(['/../auth/'], {relativeTo: this.curRoute});
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

  get confirmPassword() {
    return this.registerForm.get('confirmPassword').value;
  }
}
