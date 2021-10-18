import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBoardComponent } from './admin-board.component';

import { DashboardComponent } from '../admin-pages/dashboard/dashboard.component';
import { EmpleadosComponent } from '../admin-pages/empleados/empleados.component';
import { NotificacionesComponent } from '../admin-pages/notificaciones/notificaciones.component';


const routes: Routes = [
  {
    path: '',
    component: AdminBoardComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'empleados',
        component: EmpleadosComponent
      },
      {
        path: 'notificaciones',
        component: NotificacionesComponent
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBoardRoutingModule {}
