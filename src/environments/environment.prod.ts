import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true
};

export const API = 'https://stattrackapi-dev.herokuapp.com';
// export const API = 'https://localhost:3000';
export const HEADERS = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
