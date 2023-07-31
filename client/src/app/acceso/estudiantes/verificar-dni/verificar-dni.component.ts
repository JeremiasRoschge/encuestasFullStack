import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar-dni',
  templateUrl: './verificar-dni.component.html',
  styleUrls: ['./verificar-dni.component.css']
})
export class VerificarDniComponent {
  dni: string = '';
  resultadoConsulta: any;

  constructor(private http: HttpClient, private router: Router) {}

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
          // Convertir las propiedades "Count" y "BoletaCount" a números
          const count = Number(response.Count);
          const boletaCount = Number(response.BoletaCount);
  
          if (count === 1 || boletaCount === 1) {
            alert('Usted no puede votar porque ya ha emitido su voto.');
          } else if (response.Habilitado === 'si') {
            // Realizar la solicitud HTTP para incrementar el valor de la columna "count"
            this.http.post<any>('https://localhost:44374/api/IncrementarCount', { dni: this.dni })
              .subscribe(
                (incrementResponse) => {
                  if (incrementResponse === 'success') {
                    // Redirigir al usuario a la página de votar
                    this.router.navigate(['/sistema']);
                  } else {
                    alert('Error al incrementar el contador.');
                  }
                },
                (error) => {
                  console.log(error);
                }
              );
          } else {
            alert('Usted no esta habilitado para votar, por favor hable con un presidente de mesa para solucionar su problema.');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
