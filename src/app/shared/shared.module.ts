import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { User } from './models/user/user';
import { Team } from './models/team/team';
import { Player } from './models/player/player';
import { TeamSeason } from './models/team/team-season';
import { TeamGame } from './models/team/team-game';
import { Season } from './models/season/season';
import { TeamGameStats } from './models/team/team-game-stats';
import { PlayerSeason } from './models/player/player-season';
import { PlayerGame } from './models/player/player-game';
import { PlayerOffensiveGameStats } from './models/player/player-offensive-game-stats';
import { PlayerDefensiveGameStats } from './models/player/player-defensive-game-stats';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    User,
    Season,
    Team,
    TeamSeason,
    TeamGame,
    TeamGameStats,
    Player,
    PlayerSeason,
    PlayerGame,
    PlayerOffensiveGameStats,
    PlayerDefensiveGameStats
  ]
})
export class SharedModule { }
