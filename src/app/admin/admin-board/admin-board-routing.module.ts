import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBoardComponent } from './admin-board.component';

import { DashboardComponent } from '../admin-pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminBoardComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBoardRoutingModule {}
