import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div>
    <div class="modal-header">
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Facemask Detector es un proyecto de investigación que consiste en el desarrollo de la presente aplicación web que, mediante Inteligencia Artificial, es capaz de monitorear el uso correcto del tapabocas en los empleados de una empresa cualquiera, generando de este modo métricas a ser usadas para el análisis y la toma de decisiones que ayuden a mejorar la seguridad dentro del espacio laboral. </p>
    </div>
  </div>
  `
})
export class NgbdModalContent {

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent, { centered: true });
  }

  ngOnInit(): void {
  }

}
