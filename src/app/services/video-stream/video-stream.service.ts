import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class VideoStreamService {
  startStream = 'http://127.0.0.1:5000/start_stream';

  constructor(private http: HttpClient) {}

   start_feed(userId: any): any{
     return this.http.get<any>(this.startStream + '/' + userId.toString());
    }

  stop_feed(userId: any): any{
    return this.http.get<any>(this.startStream + '/' + userId.toString() + '/' + '1');
  }
}

