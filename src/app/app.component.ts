import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FacaMaskDTor';
  rout: Router;

  constructor(private router: Router){
    this.rout = router;
}
}

