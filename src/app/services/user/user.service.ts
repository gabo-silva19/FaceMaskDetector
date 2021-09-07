import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const authRoute = 'http://127.0.0.1:5000/auth/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(authRoute + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(authRoute + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(authRoute + 'admin', { responseType: 'text' });
  }


}
