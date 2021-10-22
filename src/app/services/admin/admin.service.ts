import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { retry, share, switchMap, tap } from 'rxjs/operators';


const regRoute = 'http://127.0.0.1:5000/admin/get_fault_reg';
const totalRoute = 'http://127.0.0.1:5000/admin/get_fault_total';
const dayRoute = 'http://127.0.0.1:5000/admin/get_fault_day';
const employeeListRoute = 'http://127.0.0.1:5000/empleados/get_all';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getRegistry() {
    return timer(0, 30000).pipe(
      switchMap(() => this.http.get(regRoute)),
      retry(),
      share()
    );
  }

  getTotal() {
    return timer(0, 30000).pipe(
      switchMap(() => this.http.get(totalRoute)),
      retry(),
      share()
    );
  }

  getDay() {
    return timer(0, 30000).pipe(
      switchMap(() => this.http.get(dayRoute)),
      retry(),
      share()
    );
  }

  getEmployess() {
    return this.http.get(employeeListRoute);
  }

}
