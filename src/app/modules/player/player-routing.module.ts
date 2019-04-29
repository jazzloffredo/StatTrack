import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
    {
        path: '',
        component: PlayersComponent
    },
    {
        path: ':id',
        component: PlayerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PlayerRoutingModule { }
