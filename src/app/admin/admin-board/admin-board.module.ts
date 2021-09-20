import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminBoardRoutingModule } from './admin-board-routing.module';
import { AdminBoardComponent } from './admin-board.component';

import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import { DashboardComponent } from '../admin-pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AdminBoardComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminBoardRoutingModule
  ]
})
export class AdminBoardModule { }
