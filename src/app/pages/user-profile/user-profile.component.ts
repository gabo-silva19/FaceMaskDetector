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
  pieChartOptions: ChartOptions = {
    responsive: false,
  };
  pieChartLabels: Label[] = ['Cumplimientos', 'Faltas'];
  pieChartData: SingleDataSet = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  pieChartColors: Color[] = [
    {backgroundColor: ['rgba(245, 177, 132, 1)', 'rgba(132, 245, 183, 1)']}
  ];

  // Gráfico de barras
  barChartOptions: ChartOptions = {
    responsive: false,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    {data: [], label: 'Faltas por día' },
    {data: [], label: 'Cumplimientos por día'}
  ];

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
    this.toastNotification();

  }

  // Encender y apagar stream
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

  // Apagar stream
  stopStream(ci: any): void{
    this.video.stop_feed(ci).subscribe(data => {
      console.log('Stopping');
    });
  }

  callSendStreamData(history: Historial): void {
    this.userService.sendStreamData(history).subscribe(data => {
      console.log('Success');
    });
  }

  callStreamData() {
    this.streamData$.subscribe(async (history: Historial) => {
      this.callSendStreamData(history);
    });
  }

  addToPie() {
    this.userService.getInfoPie(this.currentUser.ci).subscribe((data: any) => {
      this.pieChartData = [];

      const dc = data.cumplimientos;
      const df = data.faltas;

      this.pieChartData.push(dc);
      this.pieChartData.push(df);

    });

  }

  addToBar() {
    this.userService.getInfoBar(this.currentUser.ci).subscribe((data: any) => {
      this.barChartData[0].data = [];
      this.barChartData[1].data = [];
      this.barChartLabels = [];

      const dc = data.cumplimientos;
      const df = data.faltas;

      for (let c of dc){
        this.barChartLabels.push(c.fecha);
        this.barChartData[1].data?.push(c.modo);
      }
      for (let f of df){
        this.barChartData[0].data?.push(f.modo);
      }

    });

  }

  // Notificaciones push
  toastNotification() {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle('¡Cuidado!');
    newToastNotification.setMessage('Form is not valid!');

    newToastNotification.setConfig({
        LayoutType: DialogLayoutDisplay.DANGER,
        ToastUserViewType: ToastUserViewTypeEnum.STANDARD
    });

    newToastNotification.openToastNotification$();
}



}

