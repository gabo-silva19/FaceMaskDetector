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
  // Gráfico de linea
  lineChartType: ChartType = 'line';
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Uso incorrecto' },
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
  public pieChartLabels: Label[] = ['Total empleados', 'Total de usos incorrectos'];
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
    { data: [], label: 'Usos incorrectos en la semana ' }
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

  // Segundo gráfico de barra
  barChartType2: ChartType = 'bar';
  barChartData2: ChartDataSets[] = [
    { data: [], label: 'Cumplientos de uso el día de hoy' },
    { data: [], label: 'Incumplimientos de uso el día de hoy' }
  ];
  barChartLabels2: Label[] = [];
  barChartOptions2: ChartOptions = {
    responsive: true,
  };
  barChartColors2: Color[] = [
    {backgroundColor: '#5affce'},
    {backgroundColor: '#c68af9'}
  ];
  barChartLegend2 = true;
  barChartPlugins2 = [];

  // Tarjetas
  best = '';
  worst = '';

  constructor(private admin: AdminService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.addToLine();
    this.addToPie();
    this.addToBar();
    this.addToBar2();
    this.addToCards();

  }

  // Añadir datos al gráfico de linea
  addToLine(): void {
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
  addToPie(): void {
    this.admin.getTotal().subscribe((data: any) => {
      this.pieChartData = [];

      const totE = data.total_empleados;
      const totF = data.faltas;

      this.pieChartData.push(totE);
      this.pieChartData.push(totF);

    });
  }

  // Añadir datos al gráfico de barra
  addToBar(): void {
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

  // Añadir datos al segundo gráfico de barras
  addToBar2(): void {
    this.admin.countDaily().subscribe((data: any) => {
      this.barChartData2[0].data = [];
      this.barChartData2[1].data = [];
      this.barChartLabels2 = [];

      const dc = data.cumplimientos;
      const df = data.faltas;

      for (let c of dc){
        this.barChartLabels2.push(c.name);
        this.barChartData2[0].data?.push(c.count);
      }
      for (let f of df){
        this.barChartData2[1].data?.push(f.count);
      }
    });
  }

  // Añadir a tarjetas
  addToCards(): void {
    this.admin.getBestAndWorst().subscribe((data: any) => {
      this.best = data.best[0].name;
      this.worst = data.worst[0].name;
    });
  }

}
