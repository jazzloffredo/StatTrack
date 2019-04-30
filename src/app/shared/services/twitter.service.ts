import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tweet } from '../models/twitter/tweet';
import { UserTwitterFavorites } from '../models/twitter/user-twitter-favorites';
import { API, HEADERS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private http: HttpClient) { }

  retrieveTweetsForName(userFavNames: UserTwitterFavorites): Tweet[] {
    const retTweets: Tweet[] = [];

    for (let playerName of userFavNames.userPlayerNames) {
      playerName = playerName.replace(' ', '-');
      this.http.get<Tweet[]>(API + '/twitter/retrieveTweetsForName/' + playerName, HEADERS)
        .subscribe((data) => {
          for (const tweet of data) {
            retTweets.push(tweet);
          }
        });
    }

    for (let teamName of userFavNames.userTeamNames) {
      teamName = teamName.replace(' ', '-');
      this.http.get<Tweet[]>(API + '/twitter/retrieveTweetsForName/' + teamName, HEADERS)
        .subscribe((data) => {
          for (const tweet of data) {
            retTweets.push(tweet);
          }
        });
    }

    return retTweets;
  }
}
