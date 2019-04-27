import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './modules/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'teams',
    loadChildren: './modules/team/team.module#TeamModule'
  },
  {
    path: 'players',
    loadChildren: './modules/player/player.module#PlayerModule'
  },
  {
    path: 'error',
    loadChildren: './modules/error/error.module#ErrorModule'
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
