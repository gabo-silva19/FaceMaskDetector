import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    //{ path: '', redirectTo: '/home', pathMatch: 'full'}, //Aquí el redireccionamiento inicial que va hacia el HOME (por ahora)
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }, //Aquí la ruta de la página HOME
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },//Aquí la ruta de la página LOGIN
    { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
