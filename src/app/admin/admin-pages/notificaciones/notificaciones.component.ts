import { Component, OnInit } from '@angular/core';
import {
  ToastNotificationInitializer,
  DialogLayoutDisplay,
  ToastUserViewTypeEnum,
  ToastProgressBarEnum,
  ToastPositionEnum,
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.toastNotification();
  }

  toastNotification() {
    const newToastNotification = new ToastNotificationInitializer();

    newToastNotification.setTitle('Title');
    newToastNotification.setMessage('Your message!');

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
