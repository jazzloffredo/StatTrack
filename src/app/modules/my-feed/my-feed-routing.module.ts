import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwitterFeedComponent } from './twitter-feed/twitter-feed.component';

const routes: Routes = [
    {
        path: '',
        component: TwitterFeedComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MyFeedRoutingModule { }
