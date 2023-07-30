import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44374/api/Login'; // Asegúrate de que la URL sea correcta para tu backend

  constructor(private http: HttpClient) { }

  // Método para validar el token en el backend
  validateToken(token: string): Observable<boolean> {
    // Configurar las cabeceras CORS necesarias
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      })
    };

    // Aquí construimos el objeto con el token para enviarlo en el cuerpo de la solicitud POST
    const tokenData = { Token: token };

    // Realizar la solicitud de validación de token al backend
    return this.http.post<boolean>(`${this.apiUrl}/Validate`, tokenData, httpOptions);
  }
}
