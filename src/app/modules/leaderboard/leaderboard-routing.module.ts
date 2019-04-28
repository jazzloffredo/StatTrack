import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderboardsComponent } from './leaderboards/leaderboards.component';

const routes: Routes = [
    {
        path: '',
        component: LeaderboardsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LeaderboardRoutingModule { }
