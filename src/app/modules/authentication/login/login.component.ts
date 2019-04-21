import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  private unsubscribe: Subject<boolean> = new Subject<boolean>();

  usernameOrPasswordIncorrect = false;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private router: Router,
              private curRoute: ActivatedRoute,
              private authService: AuthService) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService.attemptLogin(this.username, this.password)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loginForm.reset();
        this.usernameOrPasswordIncorrect = false;
        this.authService.setIsLoggedIn(true);
        this.router.navigate(['/../../'], {relativeTo: this.curRoute});
        this.spinner.hide();
      }, (err: HttpErrorResponse) => {
        this.spinner.hide();
        if (err.error.message === 'Login failed.') {
          this.usernameOrPasswordIncorrect = true;
        }
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  get username() {
    return this.loginForm.get('username').value;
  }

  get password() {
    return this.loginForm.get('password').value;
  }
}
