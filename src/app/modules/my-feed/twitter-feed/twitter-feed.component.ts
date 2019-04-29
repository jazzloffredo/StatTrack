import { Component, OnInit } from '@angular/core';

import { Tweet } from 'src/app/shared/models/twitter/tweet';

@Component({
  selector: 'app-twitter-feed',
  templateUrl: './twitter-feed.component.html',
  styleUrls: ['./twitter-feed.component.scss']
})
export class TwitterFeedComponent implements OnInit {

  returnedTweets: Tweet[];

  constructor() { }

  ngOnInit() {
  }

}
