import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './modules/authentication/authentication.module#AuthenticationModule'
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
    redirectTo: '',
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
