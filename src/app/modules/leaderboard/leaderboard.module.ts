import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LeaderboardRoutingModule } from './leaderboard-routing.module';

import { LeaderboardsComponent } from './leaderboards/leaderboards.component';

@NgModule({
  declarations: [LeaderboardsComponent],
  imports: [
    CommonModule,
    LeaderboardRoutingModule,
    NgxSpinnerModule
  ]
})
export class LeaderboardModule { }
