import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminBoardRoutingModule } from './admin-board-routing.module';
import { AdminBoardComponent } from './admin-board.component';

import { SidebarComponent } from 'src/app/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AdminBoardComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AdminBoardRoutingModule
  ]
})
export class AdminBoardModule { }
