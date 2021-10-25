import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ToastNotificationInitializer,
  DialogLayoutDisplay,
  ToastUserViewTypeEnum,
  ToastProgressBarEnum,
  ToastPositionEnum,
} from '@costlydeveloper/ngx-awesome-popup';

import { UserService } from 'src/app/services/user/user.service';
import { Historial } from 'src/models/historial.model';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  // General
  streamData$: Observable<Historial>;
  default = 'Tapabocas en uso';


  constructor(private userService: UserService) {
    this.streamData$ = this.userService.getStreamData();

   }

  ngOnInit(): void {
    this.streamData$.subscribe(async (history: Historial) => {
      this.default = history.modo_uso;
      if (this.default !== 'Tapabocas en uso'){
        this.toastNotification(history.ci_e, history.fecha);
      }
    });
  }

  toastNotification(ci: any, fecha: any) {
    const newToastNotification = new ToastNotificationInitializer();

    const hour = fecha;

    newToastNotification.setTitle('¡Alerta! ' + hour.toString());
    newToastNotification.setMessage('El empleado: ' + ci.toString() + ' no está haciendo uso correcto del tapabocas');

    // Choose layout color type
    newToastNotification.setConfig({
    AutoCloseDelay: 0, // optional
    TextPosition: 'center',
    LayoutType: DialogLayoutDisplay.WARNING,
    ProgressBar: ToastProgressBarEnum.NONE,
    ToastUserViewType: ToastUserViewTypeEnum.SIMPLE,
    OpenInElementID: 'notif',
    ToastPosition: ToastPositionEnum.BOTTOM_CENTER,
    });

    // Simply open the popup
    newToastNotification.openToastNotification$();
}

}
