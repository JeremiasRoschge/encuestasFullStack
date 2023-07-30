import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.post<any>('https://localhost:44374/api/VerificarDNI', { Dni: this.dni })
      .subscribe(
        (response) => {
          this.resultadoConsulta = response;
          if (response && response.Habilitado === 'si') {
            // Redirigir al usuario a la página de votar
            window.location.href = '/ruta-de-la-pagina-de-votar';
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
