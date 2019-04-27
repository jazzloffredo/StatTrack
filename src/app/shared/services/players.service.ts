import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from '../models/player/player';
import { UserFavoritePlayer } from '../models/player/user-favorite-player';
import { API, HEADERS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  allPlayers: Player[] = [];

  constructor(private http: HttpClient) { }

  retrieveAllPlayers(pageNumber: number) {
    return this.http.get<Player[]>(API + '/player/retrieveAllPlayers/' + pageNumber, HEADERS);
  }

  retrieveAllPlayersGivenChar(lastNameChar: string) {
    return this.http.get<Player[]>(API + '/player/retrieveAllPlayersGivenChar/' + lastNameChar, HEADERS);
  }

  retrieveFavoritePlayersForUser(username: string) {
    return this.http.get<string[]>(API + '/player/retrieveFavoritePlayers/' + username, HEADERS);
  }

  addFavoritePlayerForUser(username: string, playerID: string): Observable<boolean> {
    const addPlayerFavUser = new UserFavoritePlayer(username, playerID);
    return this.http.post<boolean>(API + '/player/addFavoritePlayerForUser', addPlayerFavUser, HEADERS);
  }

  deleteFavoritePlayerForUser(username: string, playerID: string): Observable<boolean> {
    const deletePlayerFavUser = new UserFavoritePlayer(username, playerID);
    return this.http.post<boolean>(API + '/player/deleteFavoritePlayerForUser', deletePlayerFavUser, HEADERS);
  }
}
