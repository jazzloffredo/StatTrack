import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<boolean> = new Subject<boolean>();

  displayLogout = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getIsLoggedIn()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((isLoggedIn) => {
        this.displayLogout = isLoggedIn;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  logout() {
    this.authService.setIsLoggedIn(false);
    this.authService.setUsername(undefined);
    this.router.navigate(['/auth/logout']);
  }
}
