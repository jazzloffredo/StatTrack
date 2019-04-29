import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { NewUser } from '../models/user/new-user';
import { LoginUser } from '../models/user/login-user';
import { RegisteredUser } from '../models/user/registered-user';

import { API, HEADERS } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    sessionStorage.getItem('isLoggedIn') === 'true'
  );

  private username: BehaviorSubject<string> = new BehaviorSubject<string>(
    sessionStorage.getItem('username')
  );

  constructor(private http: HttpClient) { }

  registerUser(firstName: string, lastName: string, username: string, email: string, password: string) {
    const newUser = new NewUser(firstName, lastName, username, email, password);
    return this.http.post(API + '/auth/registerUser', newUser, HEADERS);
  }

  attemptLogin(username: string, password: string) {
    const loginUser = new LoginUser(username, password);
    return this.http.post(API + '/auth/attemptLogin', loginUser, HEADERS);
  }

  updatePassword(username: string, password: string) {
    const updatePasswordUser = new LoginUser(username, password);
    return this.http.post<boolean>(API + '/auth/updatePassword', updatePasswordUser, HEADERS);
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    sessionStorage.setItem('isLoggedIn', String(isLoggedIn));
    this.isLoggedIn.next(isLoggedIn);
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  setUsername(username: string) {
    console.log(username);
    sessionStorage.setItem('username', String(username));
    this.username.next(username);
  }

  getUsername(): string {
    return this.username.value;
  }
}
