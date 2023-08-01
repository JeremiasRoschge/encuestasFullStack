import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DniService } from '../../../services/dni.services';
import { VotoModel } from '../../../models/VotarModel'; 

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  selections: VotoModel = { President: '', Secretary: '' };
  dniConfirmado: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private dniService: DniService
  ) {}

  ngOnInit(): void {
    // Obtener los parámetros de consulta de la URL
    this.route.queryParams.subscribe(params => {
      this.selections.President = params['presidentSelection'];
      this.selections.Secretary = params['secretarySelection'];
    });

    this.dniConfirmado = this.dniService.obtenerDniConfirmado();

    // Agregar un mensaje de depuración para verificar el valor de dniConfirmado
    console.log('DNI Confirmado:', this.dniConfirmado);
  }

  changeSelection() {
    this.router.navigate(['/presidencia']);
    this.selections.President = '';
    this.selections.Secretary = '';
  }

  sendVote() {
    const selectedPresident = this.selections.President;
    const selectedSecretary = this.selections.Secretary;

    if (selectedPresident && selectedSecretary) {
      if (this.dniConfirmado) {
        // Objeto con los datos a enviar en la solicitud POST a api/Votar
        const dataVotar: VotoModel = { President: selectedPresident, Secretary: selectedSecretary };

        // Opciones para la cabecera de la solicitud POST
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };

        // Realizar la solicitud POST a api/Votar usando HttpClient
        this.http.post('https://localhost:44374/api/Votar', dataVotar, httpOptions).subscribe(
          (response: any) => {
            // Manejar la respuesta del servidor según los casos posibles
            if (response === '¡El voto se envió correctamente!') {
              // Redirigir a la página de éxito
              this.router.navigate(['/voto-enviado']);

              // Objeto con los datos a enviar en la solicitud POST a api/IncrementarBoletaCount
              const dataIncrementar = { dni: this.dniConfirmado };

              // Realizar la solicitud POST a api/IncrementarBoletaCount usando HttpClient
              this.http.post('https://localhost:44374/api/IncrementarBoletaCount', dataIncrementar, httpOptions).subscribe(
                (responseIncrementar: any) => {
                  // Manejar la respuesta del servidor de api/IncrementarBoletaCount
                  if (responseIncrementar === 'success') {
                    // La operación de incremento fue exitosa
                    console.log('El contador se incrementó correctamente.');
                  } else if (responseIncrementar === 'error') {
                    // Mostrar mensaje de error en caso de que el DNI no exista en la tabla
                    alert('El DNI no existe en la tabla.');
                  } else {
                    // Mostrar mensaje de error genérico en caso de respuesta inesperada
                    alert('Error en el servidor al incrementar el contador.');
                  }
                },
                (errorIncrementar: any) => {
                  // Manejar errores de la solicitud HTTP a api/IncrementarBoletaCount
                  console.error('Error al enviar la solicitud a api/IncrementarBoletaCount:', errorIncrementar);
                  alert('Error al incrementar el contador. Por favor, intenta nuevamente.');
                }
              );
            } else if (response === 'duplicate') {
              // Mostrar mensaje de error y redirigir a la página de error
              alert('El DNI ya se ingresó anteriormente.');
              this.router.navigate(['/error-dni']);
            } else if (response === 'not_allowed') {
              // Mostrar mensaje de error y redirigir a la página de error
              alert('El DNI no está habilitado para votar.');
              this.router.navigate(['/error-dni']);
            } else {
              // Mostrar mensaje de error y redirigir a la página de error
              alert('El DNI no está en la base de datos.');
              this.router.navigate(['/error-dni']);
            }
          },
          (error: any) => {
              // Manejar errores de la solicitud HTTP
          console.error('Error al enviar el voto:', error);
          alert('Error al enviar el voto. Por favor, intenta nuevamente.');
        }
      );
    } else {
      // Si el DNI no está confirmado, solicitarlo al usuario
      const dni = prompt('Por favor, ingresa tu DNI:');
      if (dni) {
        // Guardar el DNI confirmado en el servicio
        this.dniService.guardarDniConfirmado(dni);
        // Volver a enviar el voto
        this.sendVote();
      } else {
        alert('Por favor, ingresa tu DNI.');
      }
    }
  } else {
    alert('Por favor, elige una opción antes de continuar.');
  }
  }
}