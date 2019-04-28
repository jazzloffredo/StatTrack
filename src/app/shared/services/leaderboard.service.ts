import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LeaderboardPlayer } from '../models/player/leaderboard-player';
import { API, HEADERS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private http: HttpClient) { }

  retrieveSmallestPlayers() {
    return this.http.get<LeaderboardPlayer[]>(API + '/leaderboard/retrieveSmallestPlayers', HEADERS);
  }

  retrieveLargestPlayers() {
    return this.http.get<LeaderboardPlayer[]>(API + '/leaderboard/retrieveLargestPlayers', HEADERS);
  }

  retrieveShortestPlayers() {
    return this.http.get<LeaderboardPlayer[]>(API + '/leaderboard/retrieveShortestPlayers', HEADERS);
  }

  retrieveTallestPlayers() {
    return this.http.get<LeaderboardPlayer[]>(API + '/leaderboard/retrieveTallestPlayers', HEADERS);
  }

  retrieveHBPPlayers() {
    return this.http.get<LeaderboardPlayer[]>(API + '/leaderboard/retrieveHBPPlayers', HEADERS);
  }

  retrieveWildPlayers() {
    return this.http.get<LeaderboardPlayer[]>(API + '/leaderboard/retrieveWildPlayers', HEADERS);
  }

  retrieveStrikeoutsPlayers() {
    return this.http.get<LeaderboardPlayer[]>(API + '/leaderboard/retrieveStrikeoutsPlayers', HEADERS);
  }

  retrieveBasesPlayers() {
    return this.http.get<LeaderboardPlayer[]>(API + '/leaderboard/retrieveBasesPlayers', HEADERS);
  }

  retrieveHomerunsPlayers() {
    return this.http.get<LeaderboardPlayer[]>(API + '/leaderboard/retrieveHomerunsPlayers', HEADERS);
  }
}
