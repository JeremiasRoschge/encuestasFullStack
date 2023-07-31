import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/Login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  url: string = 'https://localhost:44374/api/Login';

  getLogin() {
    return this.http.get(this.url);
  }

  postLogin(login: Login): Observable<string> {
    // Agregar las cabeceras CORS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:44369'
      })
    };

    return this.http.post<string>(this.url, login, httpOptions);
  }
}
