import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const authRoute = 'http://127.0.0.1:5000/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: { correo: string; contrasena: string; }): Observable<any> {
    return this.http.post(authRoute + 'login', {
      correo: credentials.correo,
      contrasena: credentials.contrasena
    }, httpOptions);
  }

}

