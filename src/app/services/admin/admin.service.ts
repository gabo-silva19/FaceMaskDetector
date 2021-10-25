import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { retry, share, switchMap, tap } from 'rxjs/operators';


const regRoute = 'http://127.0.0.1:5000/admin/get_fault_reg';
const totalRoute = 'http://127.0.0.1:5000/admin/get_fault_total';
const dayRoute = 'http://127.0.0.1:5000/admin/get_fault_day';
const employeeListRoute = 'http://127.0.0.1:5000/empleados/get_all';
const bestWorstRoute = 'http://127.0.0.1:5000/admin/get_b_w';
const countDailyRoute = 'http://127.0.0.1:5000/admin/count_by_day';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getRegistry(): Observable<any> {
    return timer(0, 30000).pipe(
      switchMap(() => this.http.get(regRoute)),
      retry(),
      share()
    );
  }

  getTotal(): Observable<any> {
    return timer(0, 30000).pipe(
      switchMap(() => this.http.get(totalRoute)),
      retry(),
      share()
    );
  }

  getDay(): Observable<any> {
    return timer(0, 30000).pipe(
      switchMap(() => this.http.get(dayRoute)),
      retry(),
      share()
    );
  }

  getEmployess(): Observable<any> {
    return this.http.get(employeeListRoute);
  }

  getBestAndWorst(): Observable<any> {
    return timer(0, 60000).pipe(
      switchMap(() => this.http.get(bestWorstRoute)),
      retry(),
      share()
    );
  }

  countDaily(): Observable<any> {
    return timer(0, 60000).pipe(
      switchMap(() => this.http.get(countDailyRoute)),
      retry(),
      share()
    );
  }

}
