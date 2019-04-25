import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Team } from '../models/team/team';
import { API, HEADERS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) {
    this.retrieveAllTeams();
  }

  retrieveAllTeams() {
    return this.http.get<Team[]>(API + '/team/retrieveAllTeams', HEADERS);
  }
}
