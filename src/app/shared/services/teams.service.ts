import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Team } from '../models/team/team';
import { TeamSeason } from '../models/team/team-season';
import { UserFavoriteTeam } from '../models/team/user-favorite-team';
import { API, HEADERS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) {}

  retrieveAllTeams() {
    return this.http.get<Team[]>(API + '/team/retrieveAllTeams', HEADERS);
  }

  retrieveAllTeamSeasons(id: string) {
    return this.http.get<TeamSeason[]>(API + '/team/retrieveAllTeamSeasons/' + id, HEADERS);
  }

  retrieveFavoriteTeamsForUser(username: string) {
    return this.http.get<string[]>(API + '/team/retrieveFavoriteTeams/' + username, HEADERS);
  }

  retrieveFavoriteTeamNames(username: string) {
    return this.http.get<string[]>(API + '/team/retrieveFavoriteTeamNames/' + username, HEADERS);
  }

  addFavoriteTeamForUser(username: string, teamID: string): Observable<boolean> {
    const addTeamFavUser = new UserFavoriteTeam(username, teamID);
    return this.http.post<boolean>(API + '/team/addFavoriteTeamForUser', addTeamFavUser, HEADERS);
  }

  deleteFavoriteTeamForUser(username: string, teamID: string): Observable<boolean> {
    const deleteTeamFavUser = new UserFavoriteTeam(username, teamID);
    return this.http.post<boolean>(API + '/team/deleteFavoriteTeamForUser', deleteTeamFavUser, HEADERS);
  }
}
