import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyFeedRoutingModule } from './my-feed-routing.module';

import { TwitterFeedComponent } from './twitter-feed/twitter-feed.component';

@NgModule({
  declarations: [TwitterFeedComponent],
  imports: [
    CommonModule,
    MyFeedRoutingModule
  ]
})
export class MyFeedModule { }
