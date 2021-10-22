import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Empleados
  employees: any[] = [];

  // Gráfico de linea
  lineChartType: ChartType = 'line';
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Faltas' },
  ];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: '#5affce',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];

  // Gráfico de torta
  public pieChartType: ChartType = 'pie';

  public pieChartData: SingleDataSet = [];
  public pieChartLabels: Label[] = ['Total empleados', 'Total faltas'];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartColors: Color[] = [
    {
      backgroundColor: ['#5affce', '#c68af9']
    }
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // Gráfico de barra
  barChartType: ChartType = 'bar';
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Faltas en la semana ' }
  ];
  barChartLabels: Label[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartColors: Color[] = [
    {
      backgroundColor: '#5affce'
    }
  ];
  barChartLegend = true;
  barChartPlugins = [];


  constructor(private admin: AdminService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.addToLine();
    this.addToPie();
    this.addToBar();
    this.addToEmployees();
  }

  // Añadir datos al gráfico de linea
  addToLine() {
    this.admin.getRegistry().subscribe((data: any) => {
      this.lineChartLabels = [];
      this.lineChartData[0].data = [];

      const faultCount = data.faltas;
      for (let fault of faultCount){
        this.lineChartLabels.push(fault.hora);
        this.lineChartData[0].data.push(fault.count);
      }
    });
  }

  // Añadir datos al gráfico de torta
  addToPie() {
    this.admin.getTotal().subscribe((data: any) => {
      this.pieChartData = [];

      const totE = data.total_empleados;
      const totF = data.faltas;

      this.pieChartData.push(totE);
      this.pieChartData.push(totF);

    });
  }

  // Añadir datos al gráfico de barra
  addToBar() {
    this.admin.getDay().subscribe((data: any) => {
      this.barChartData[0].data = [];
      this.barChartLabels = [];

      const faltas = data.faltas;
      for(let f of faltas) {
        this.barChartData[0].data.push(f.modo);
        this.barChartLabels.push(f.fecha);
      }
    });
  }

  // Añadir datos a la lista de empleados
  addToEmployees() {
    this.admin.getEmployess().subscribe((data: any) => {
      this.employees = [];

      const emp = data.users;
      for (let e of emp ){
        this.employees.push(e);
      }
    });
  }

}
