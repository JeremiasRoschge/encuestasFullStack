import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-consultar-dni',
  templateUrl: './verificar-dni.component.html',
  styleUrls: ['./verificar-dni.component.css']
})
export class VerificarDniComponent {
  dni: string = ''; // Inicializar dni con un valor por defecto
  resultadoConsulta: any;

  constructor(private http: HttpClient) {}

  verificarDNI() {
    // Realizar la solicitud HTTP al backend para verificar el DNI
    this.http.get<any>(`https://localhost:44374/api/VerificarDNI/${this.dni}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            alert('El DNI no existe'); // Mostrar alert si es error 404
          }
          return throwError(error); // Continuar con el manejo del error
        })
      )
      .subscribe(
        (response) => {
          this.resultadoConsulta = response;
          if (response && response.Habilitado === 'si') {
            // Redirigir al usuario a la página de votar
            window.location.href = '/sistema';
          } else {
            alert('Usted no esta habilitado para votar, por favor hable con el presidente de mesa para ser habilitado.')
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
