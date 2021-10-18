import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminBoardRoutingModule } from './admin-board-routing.module';
import { AdminBoardComponent } from './admin-board.component';

import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import { DashboardComponent } from '../admin-pages/dashboard/dashboard.component';
import { EmpleadosComponent } from '../admin-pages/empleados/empleados.component';
import { NotificacionesComponent } from '../admin-pages/notificaciones/notificaciones.component';


@NgModule({
  declarations: [
    AdminBoardComponent,
    SidebarComponent,
    DashboardComponent,
    EmpleadosComponent,
    NotificacionesComponent
  ],
  imports: [
    CommonModule,
    AdminBoardRoutingModule
  ]
})
export class AdminBoardModule { }
