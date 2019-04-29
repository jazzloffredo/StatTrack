import { Component, OnInit } from '@angular/core';

import { Tweet } from '../../../shared/models/twitter/tweet';
import { TwitterService } from '../../../shared/services/twitter.service';

@Component({
  selector: 'app-twitter-feed',
  templateUrl: './twitter-feed.component.html',
  styleUrls: ['./twitter-feed.component.scss']
})
export class TwitterFeedComponent implements OnInit {

  returnedTweets: Tweet[];

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
    this.returnedTweets = this.twitterService.retrieveTweetsForName();
  }

}
