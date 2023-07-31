import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  selections: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Obtener los parámetros de consulta de la URL
    this.route.queryParams.subscribe(params => {
      this.selections['presidentSelection'] = params['presidentSelection'];
      this.selections['secretarySelection'] = params['secretarySelection'];
    });
  }

  // ... (resto del código del componente) ...

  changeSelection() {
    this.router.navigate(['/presidencia'])
    this.selections['presidentSelection'] = undefined;
    this.selections['secretarySelection'] = undefined;
  }

  sendVote() {
    const selectedPresident = this.selections['presidentSelection'];
    const selectedSecretary = this.selections['secretarySelection'];

    if (selectedPresident && selectedSecretary) {
      // Objeto con los datos a enviar en la solicitud POST
      const data = { president: selectedPresident, secretary: selectedSecretary };

      // Opciones para la cabecera de la solicitud POST
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      // Realizar la solicitud POST usando HttpClient
      this.http.post('https://localhost:44374/api/Votar', data, httpOptions).subscribe(
        (response: any) => {
          // Manejar la respuesta del servidor según los casos posibles
          if (response === 'success') {
            // Redirigir a la página de éxito
            this.router.navigate(['/voto-enviado']);
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
      alert('Por favor, elige una opción antes de continuar.');
    }
  }
}
