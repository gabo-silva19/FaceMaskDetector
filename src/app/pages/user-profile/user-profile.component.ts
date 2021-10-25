import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { Observable } from 'rxjs';
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer,
  ToastUserViewTypeEnum
} from '@costlydeveloper/ngx-awesome-popup';

import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import { VideoStreamService } from 'src/app/services/video-stream/video-stream.service';
import { UserService } from 'src/app/services/user/user.service';

import { Historial } from 'src/models/historial.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  // General
  currentUser: any;
  loggedOut: any;
  streamRoute = '';
  isActive = false;
  streamData$: Observable<Historial>;

  // Gráfico de torta
  pieChartType: ChartType = 'pie';
  pieChartData: SingleDataSet = [];
  pieChartLabels: Label[] = ['Uso correcto', 'Uso incorrecto'];
  pieChartOptions: ChartOptions = {
    responsive: false,
  };
  pieChartLegend = true;
  pieChartPlugins = [];
  pieChartColors: Color[] = [
    {backgroundColor: ['rgba(245, 177, 132, 1)', 'rgba(132, 245, 183, 1)']}
  ];

  // Gráfico de barra
  barChartType: ChartType = 'bar';
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Incumplimientos de uso por día' },
    { data: [], label: 'Cumplimientos de uso por día' },
    { data: [], label: 'Límite de incumplimientos dirario*', type: 'line' }
  ];
  barChartLabels: Label[] = [];
  barChartOptions: ChartOptions = {
    responsive: false,
  };
  barChartLegend = true;
  barChartPlugins = [];

  constructor(private tokenStorage: TokenStorageService, private video: VideoStreamService, private userService: UserService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.streamData$ = this.userService.getStreamData();
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.loggedOut = this.tokenStorage.signOut();
    this.addToPie();
    this.addToBar();
  }

  // Manejo de la captura de video
  manageStream(ci: any): void {
    if (this.isActive === false){
      this.isActive = true;
      this.streamRoute = this.video.startStream + '/' + ci.toString();
      this.video.start_feed(ci);

      this.callStreamData();

    }else{
      this.isActive = false;
      this.stopStream(ci);

    }
  }

  // Detener captura de video
  stopStream(ci: any): void{
    this.video.stop_feed(ci).subscribe(data => {
      console.log('Stopping');
    });
  }

  // Obtener información de la captura de video y guardarla en base de datos
  callSendStreamData(history: Historial): void {
    this.userService.sendStreamData(history).subscribe(data => {
      console.log('Success');
    });
  }

  callStreamData(): void {
    this.streamData$.subscribe(async (history: Historial) => {
      this.callSendStreamData(history);
      if (history.modo_uso !== 'Tapabocas en uso'){
        this.toastNotification();
      }
    });
  }

  // Añadir datos al gráfico de tortas
  addToPie(): void {
    this.userService.getInfoPie(this.currentUser.ci).subscribe((data: any) => {
      this.pieChartData = [];

      const dc = data.cumplimientos;
      const df = data.faltas;

      this.pieChartData.push(dc);
      this.pieChartData.push(df);

    });
  }

  // Añadir datos al gráfico de barras
  addToBar(): void {
    this.userService.getInfoBar(this.currentUser.ci).subscribe((data: any) => {
      this.barChartData[0].data = [];
      this.barChartData[1].data = [];
      this.barChartData[2].data = [];
      this.barChartLabels = [];

      const dc = data.cumplimientos;
      const df = data.faltas;

      for (let c of dc){
        this.barChartLabels.push(c.fecha);
        this.barChartData[1].data?.push(c.modo);
        this.barChartData[2].data.push(10);
      }
      for (let f of df){
        this.barChartData[0].data?.push(f.modo);
        this.barChartData[2].data.push(10);
      }
    });
  }

  // Notificaciones push
  toastNotification(): void {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle('¡Cuidado!');
    newToastNotification.setMessage('Recuerda hacer uso correcto del tapabocas');

    newToastNotification.setConfig({
        LayoutType: DialogLayoutDisplay.DANGER,
        ToastUserViewType: ToastUserViewTypeEnum.STANDARD
    });
    this.playSound();
    newToastNotification.openToastNotification$();
  }

  // Sonido notificación
  playSound(): void {
    const notifSound = new Audio();
    notifSound.src = '../assets/sounds/alert.mp3';
    notifSound.load();
    notifSound.play();
  }

}

