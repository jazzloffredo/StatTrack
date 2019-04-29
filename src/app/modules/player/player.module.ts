import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PlayerRoutingModule } from './player-routing.module';

import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [PlayersComponent, PlayerComponent],
  imports: [
    CommonModule,
    MatSortModule,
    NgxSpinnerModule,
    PlayerRoutingModule
  ]
})
export class PlayerModule { }
