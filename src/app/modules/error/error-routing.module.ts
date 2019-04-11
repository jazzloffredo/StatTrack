import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '404',
        component: PageNotFoundComponent
    },
    {
        path: '',
        redirectTo: '404',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ErrorRoutingModule { }