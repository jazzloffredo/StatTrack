import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';

import { LeaderboardRoutingModule } from './leaderboard-routing.module';

@NgModule({
  declarations: [LeaderboardsComponent],
  imports: [
    CommonModule,
    FormsModule,
    LeaderboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class LeaderboardModule { }
