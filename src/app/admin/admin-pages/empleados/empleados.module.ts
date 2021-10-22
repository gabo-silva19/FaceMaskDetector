import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './empleados.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [EmpleadosComponent],
  imports: [
    CommonModule,
    ChartsModule,
    NgbModule
  ]
})
export class EmpleadosModule { }
