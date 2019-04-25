import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';

import { TeamRoutingModule } from './team-routing.module';

import { TeamsComponent } from './teams/teams.component';

@NgModule({
  declarations: [TeamsComponent],
  imports: [
    CommonModule,
    MatSortModule,
    TeamRoutingModule
  ]
})
export class TeamModule { }
