import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  private unsubscribe: Subject<boolean> = new Subject<boolean>();

  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.getIsLoggedIn()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  canLoad(): boolean {
    return this.isLoggedIn;
  }
}
