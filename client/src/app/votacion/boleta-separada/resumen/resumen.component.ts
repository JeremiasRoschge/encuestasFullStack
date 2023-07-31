import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  selections: any = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

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

    // Realizar las acciones necesarias para verificar el DNI y guardar los votos en la base de datos
    // ...

    // Después de enviar el voto y verificar el DNI, puedes redirigir al usuario a una página de éxito o error
    // Por ejemplo:
    // this.router.navigate(['/voto-enviado']); // Redireccionar a una página que indique que el voto fue enviado
    // O
    // this.router.navigate(['/error-dni']); // Redireccionar a una página de error si el DNI es inválido o el usuario ya votó
  }
}
