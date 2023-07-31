import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DniService } from '../../../services/dni.services';

@Component({
  selector: 'app-consultar-dni',
  templateUrl: './verificar-dni.component.html',
  styleUrls: ['./verificar-dni.component.css']
})
export class VerificarDniComponent {
  dni: string = '';
  resultadoConsulta: any;

  constructor(private http: HttpClient, private router: Router, private dniService: DniService) {}

  verificarDNI() {
    this.http.get<any>(`https://localhost:44374/api/VerificarDNI/${this.dni}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            alert('El DNI no existe');
          }
          return throwError(error);
        })
      )
      .subscribe(
        (response) => {  
          this.resultadoConsulta = response;
          const count = Number(response.Count);
          const boletaCount = Number(response.BoletaCount);

          if (count === 1 || boletaCount === 1) {
            alert('Usted no puede votar porque ya ha emitido su voto.');
          } else if (response.Habilitado === 'si') {
            this.dniService.guardarDniConfirmado(this.dni); // Guardar el DNI confirmado en el Local Storage

            // Realizar la solicitud POST para incrementar el contador de votos del usuario
            this.http.post<any>('https://localhost:44374/api/IncrementarCount', { dni: this.dni })
              .subscribe(
                (incrementResponse) => {
                  if (incrementResponse === 'success') {
                    // El contador de votos se incrementó correctamente, redirigir al usuario a la página de votación
                    this.router.navigate(['/sistema']);
                  } else {
                    // Error al incrementar el contador de votos, redireccionar a error
                    this.router.navigate(['/error']);
                  }
                },
                (error) => {
                  console.log(error);
                  // Error en la solicitud HTTP, redireccionar a error
                  this.router.navigate(['/error']);
                }
              );
          } else {
            alert('Usted no está habilitado para votar, por favor hable con un presidente de mesa para solucionar su problema.');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
