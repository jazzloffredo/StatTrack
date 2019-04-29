import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tweet } from '../models/twitter/tweet';
import { UserTwitterFavorites } from '../models/user-twitter-favorites';
import { API, HEADERS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private http: HttpClient) { }

  retrieveTweetsForName(userFavNames: UserTwitterFavorites): Tweet[] {
    const retTweets: Tweet[] = [];

    for (const playerName of userFavNames.userPlayerNames) {
      this.http.get<Tweet[]>(API + '/retrieveTweetsForName/' + playerName, HEADERS)
        .subscribe((data) => {
          for (const tweet of data) {
            retTweets.push(tweet);
          }
        });
    }

    for (const teamName of userFavNames.userTeamNames) {
      this.http.get<Tweet[]>(API + '/retrieveTweetsForName/' + teamName, HEADERS)
        .subscribe((data) => {
          for (const tweet of data) {
            retTweets.push(tweet);
          }
        });
    }

    return retTweets;
  }
}
