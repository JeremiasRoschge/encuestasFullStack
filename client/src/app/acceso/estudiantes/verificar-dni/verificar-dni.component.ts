import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DniService } from '../../../services/dni.services'; // Importar el servicio

@Component({
  selector: 'app-consultar-dni',
  templateUrl: './verificar-dni.component.html',
  styleUrls: ['./verificar-dni.component.css']
})
export class VerificarDniComponent {
  dni: string = '';
  resultadoConsulta: any;

  constructor(private http: HttpClient, private router: Router, private dniService: DniService) {} // Inyectar el servicio

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
          if (response && response.Habilitado === 'si') {
            this.dniService.guardarDniConfirmado(this.dni); // Guardar el DNI confirmado en el Local Storage
            this.router.navigate(['/sistema']);
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
