import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PlayerRoutingModule } from './player-routing.module';

import { PlayersComponent } from './players/players.component';

@NgModule({
  declarations: [PlayersComponent],
  imports: [
    CommonModule,
    MatSortModule,
    NgxSpinnerModule,
    PlayerRoutingModule
  ]
})
export class PlayerModule { }
