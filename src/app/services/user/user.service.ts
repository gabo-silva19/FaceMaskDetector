import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { retry, share, switchMap, tap } from 'rxjs/operators';

import { Historial } from 'src/models/historial.model';

const streamDataRoute = 'http://127.0.0.1:5000/get_stream_info';
const sendStreamDataRoute = 'http://127.0.0.1:5000/historiales/save_history';
const getDaily = 'http://127.0.0.1:5000/historiales/get_daily_fault';
const getCountFaults = 'http://127.0.0.1:5000/historiales/fault_count';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private streamData$: Observable<Historial>;


  constructor(private http: HttpClient) {
    this.streamData$ = timer(0, 5000).pipe(
      switchMap(() => this.http.get<Historial>(streamDataRoute)),
      retry(),
      tap(console.log),
      share()
    );
  }

  getStreamData(): Observable<Historial>{
    return this.streamData$.pipe(
      tap(() => console.log('Data sent to subscriber'))
    );
  }

  sendStreamData(history: Historial): Observable<any>{
    return this.http.post(sendStreamDataRoute, {
      id: history.id,
      ci_e: history.ci_e,
      modo_uso: history.modo_uso,
      fecha: history.fecha
    });
  }

  getInfoPie(ci: string) {
    return this.http.get(getDaily + '/' + ci);
  }

  getInfoBar(ci: string) {
    return this.http.get(getCountFaults + '/' + ci);
  }

}
