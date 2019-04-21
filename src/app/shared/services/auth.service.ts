import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NewUser } from '../models/user/new-user';
import { LoginUser } from '../models/user/login-user';
import { RegisteredUser } from '../models/user/registered-user';

import { API, HEADERS } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(firstName: string, lastName: string, username: string, email: string, password: string) {
    const newUser = new NewUser(firstName, lastName, username, email, password);
    return this.http.post(API + '/user/registerUser', newUser, HEADERS);
  }

  attemptLogin(username: string, password: string) {
    const loginUser = new LoginUser(username, password);
    return this.http.post(API + '/user/attemptLogin', loginUser, HEADERS);
  }

  set isLoggedIn(value: boolean) { }

  get isLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
