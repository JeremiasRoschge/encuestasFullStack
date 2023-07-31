import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultar-dni',
  templateUrl: './consultar-dni.component.html',
  styleUrls: ['./consultar-dni.component.css']
})
export class ConsultarDniComponent {
  dni: string;
  resultadoConsulta: any;

  constructor(private http: HttpClient) {
    this.dni = '';
    this.resultadoConsulta = null;
  }

  consultarDNI() {
    if (this.dni !== '') {
      // Realizar la solicitud HTTP al backend para consultar el DNI
      this.http.get<any>(`https://localhost:44374/api/VerificarDNI/${this.dni}`)
        .subscribe(
          (response) => {
            this.resultadoConsulta = response;
          },
          (error) => {
            console.log(error);
            this.resultadoConsulta = null;
          }
        );
    }
  }

  habilitarParaVotar() {
    // Realizar la solicitud HTTP al backend para habilitar al usuario
    this.http.post<any>('https://localhost:44374/api/HabilitarUsuario', { dni: this.dni })
      .subscribe(
        (response) => {
          // Actualizar el estado del resultadoConsulta con la respuesta actualizada
          this.resultadoConsulta = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}