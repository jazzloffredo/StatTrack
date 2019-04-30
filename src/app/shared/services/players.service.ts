import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Player } from '../models/player/player';
import { UserFavoritePlayer } from '../models/player/user-favorite-player';
import { PlayerBattingSeason } from '../models/player/player-batting-season';
import { PlayerFieldingSeason } from '../models/player/player-fielding-season';
import { PlayerPitchingSeason } from '../models/player/player-pitching-season';
import { API, HEADERS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  allPlayers: Player[] = [];

  constructor(private http: HttpClient) { }

  retrieveAllPlayersGivenChar(lastNameChar: string) {
    return this.http.get<Player[]>(API + '/player/retrieveAllPlayersGivenChar/' + lastNameChar, HEADERS);
  }

  retrievePlayerBattingSeasons(playerID: string) {
    return this.http.get<PlayerBattingSeason[]>(API + '/player/retrievePlayerBattingSeasons/' + playerID, HEADERS);
  }

  retrievePlayerFieldingSeasons(playerID: string) {
    return this.http.get<PlayerFieldingSeason[]>(API + '/player/retrievePlayerFieldingSeasons/' + playerID, HEADERS);
  }

  retrievePlayerPitchingSeasons(playerID: string) {
    return this.http.get<PlayerPitchingSeason[]>(API + '/player/retrievePlayerPitchingSeasons/' + playerID, HEADERS);
  }

  retrieveFavoritePlayersForUser(username: string) {
    return this.http.get<string[]>(API + '/player/retrieveFavoritePlayers/' + username, HEADERS);
  }

  retrieveFavoritePlayerNames(username: string) {
    return this.http.get<string[]>(API + '/player/retrieveFavoritePlayerNames/' + username, HEADERS);
  }

  mapPlayerIdToName(playerID: string) {
    return this.http.get<string[]>(API + '/player/mapPlayerIdToName/' + playerID, HEADERS);
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
