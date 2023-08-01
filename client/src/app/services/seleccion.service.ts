import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SeleccionService {
  presidentSelection: string | undefined;
  secretarySelection: string | undefined;
}


export class VotacionService {

  constructor(private http: HttpClient) { }

  verificarDNI(dni: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    
    return this.http.post('https://localhost:44374/api/VerificarDNI', 'dni=' + dni, httpOptions);
  }

  enviarVoto(selectedPresident: string, selectedSecretary: string) {
    const data = { president: selectedPresident, secretary: selectedSecretary };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('https://localhost:44374/api/Votar', data, httpOptions);
  }
}