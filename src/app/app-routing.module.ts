import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
// Redireccionamiento a Home
    { path: '', redirectTo: '/home', pathMatch: 'full'},
// Home
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
// Login
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
// Perfil de usuario
    { path: 'user-profile', loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule)},
// Administrador
    { path: 'admin-board', loadChildren: () => import ('./admin/admin-board/admin-board.module').then(m => m.AdminBoardModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
