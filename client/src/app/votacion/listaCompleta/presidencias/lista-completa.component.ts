import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DniService } from '../../../services/dni.services';

@Component({
  selector: 'app-lista-completa',
  templateUrl: './lista-completa.component.html',
  styleUrls: ['./lista-completa.component.css']
})
export class ListaCompletaComponent {
  selectedLista: string | null = null;
  resultadoConsulta: any;

  constructor(private http: HttpClient, private router: Router, private dniService: DniService) {}


  seleccionarLista(lista: string) {
    this.selectedLista = lista;
  }

  verificarDNI() {
    const dni = prompt('Ingrese su DNI para verificar su identidad:');
    if (dni) {
      this.http.get<any>(`https://localhost:44374/api/VerificarDNI/${dni}`)
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
              const dniConfirmado = this.dniService.obtenerDniConfirmado();
              if (dniConfirmado && dniConfirmado === dni) {
                this.actualizarContadorUsuario(dni);
              } else {
                alert('El DNI ingresado no coincide con el del paso 1. Por favor, ingrese nuevamente su DNI.');
              }
            } else {
              alert('Usted no está habilitado para votar, por favor hable con el presidente de mesa para ser habilitado.');
            }
          },
          (error) => {
            console.log(error);
            this.router.navigate(['/error']);
          }
        );
    } else {
      alert('Debes ingresar un DNI válido');
    }
  }

  actualizarContadorUsuario(dni: string) {
    if (this.selectedLista) {
      this.http.post<any>('https://localhost:44374/api/IncrementarBoletaCount', { dni: dni })
        .subscribe(
          (contadorResponse) => {
            if (contadorResponse === 'success') {
              // La actualización del contador del usuario fue exitosa, incrementar el contador del partido
              this.incrementarContadorPartido();
            } else {
              // Error en la actualización del contador del usuario, redireccionar a error
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
      alert('Debes seleccionar una lista antes de enviar');
    }
  }

  incrementarContadorPartido() {
    if (this.selectedLista) {
      this.http.post<any>('https://localhost:44374/api/Contador', { lista: this.selectedLista })
        .subscribe(
          (partidoResponse) => {
            if (partidoResponse === 'success') {
              // La actualización del contador del partido fue exitosa, cargar la página pasoFinal
              this.router.navigate(['/pasoFinal']);
            } else {
              // Error en la actualización del contador del partido, redireccionar a error
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
      alert('Debes seleccionar una lista antes de enviar');
    }
  }

  enviarSeleccion() {
    this.verificarDNI();
  }
}
