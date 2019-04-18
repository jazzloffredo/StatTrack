import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { NewUser } from '../models/user/new-user';
import { RegisteredUser } from '../models/user/registered-user';
import { UpdateUser } from '../models/user/update-user';

import { API, HEADERS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(firstName: string, lastName: string, username: string, email: string, passwordHash: string) {
    const newUser = new NewUser(firstName, lastName, username, email, passwordHash);
    return this.http.post(API + '/user/registerUser', newUser, HEADERS);
  }

  handleRegistrationError(error: HttpErrorResponse) {
    console.log('An error occurred, here is the tea sis: ' + error);
  }

  updatePassword(username: string, password: string) {
    const updateUser = new UpdateUser(username, password);
    return this.http.patch(API + '/user/updatePassword', updateUser, HEADERS);
  }

  set isLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  get isLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
