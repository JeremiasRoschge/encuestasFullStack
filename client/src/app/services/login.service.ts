import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login } from '../models/Login'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  url:string = 'https://localhost:44369/api/Login'

  getLogin() {
    return this.http.get(this.url);
  }

  postLogin(login: Login): Observable<string> {
    return this.http.post<string>(this.url, login);
  }
}