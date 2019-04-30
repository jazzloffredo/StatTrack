import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';

import { Tweet } from '../../../shared/models/twitter/tweet';
import { AuthService } from '../../../shared/services/auth.service';
import { TeamsService } from '../../../shared/services/teams.service';
import { PlayersService } from '../../../shared/services/players.service';
import { TwitterService } from '../../../shared/services/twitter.service';
import { UserTwitterFavorites } from '../../../shared/models/twitter/user-twitter-favorites';

@Component({
  selector: 'app-twitter-feed',
  templateUrl: './twitter-feed.component.html',
  styleUrls: ['./twitter-feed.component.scss']
})
export class TwitterFeedComponent implements OnInit {

  returnedTweets: Tweet[];

  constructor(private authService: AuthService,
              private teamsService: TeamsService,
              private playersService: PlayersService,
              private twitterService: TwitterService) { }

  ngOnInit() {
    const username = this.authService.getUsername();
    if (username !== undefined) {
      let teamFavNames: string[];
      let playerFavNames: string[];
      let userFavorites: UserTwitterFavorites;
      zip(
        this.teamsService.retrieveFavoriteTeamNames(username),
        this.playersService.retrieveFavoritePlayerNames(username))
        .subscribe(([teamNames, playerNames]) => {
          teamFavNames = teamNames;
          playerFavNames = playerNames;
          userFavorites = new UserTwitterFavorites(teamFavNames, playerFavNames);
          this.returnedTweets = this.twitterService.retrieveTweetsForName(userFavorites);
        });
    }
  }
}
