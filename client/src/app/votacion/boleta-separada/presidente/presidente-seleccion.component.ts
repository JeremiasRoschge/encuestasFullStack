import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeleccionService } from '../../../services/seleccion.service';

interface Candidato {
  nombre: string;
  presidente: string;
  vicepresidente: string;
  logo: string;
}

@Component({
  selector: 'app-presidente-seleccion',
  templateUrl: './presidente-seleccion.component.html',
  styleUrls: ['./presidente-seleccion.component.css']
})
export class BoletaSeparadaComponent {
  candidatos: Candidato[] = [
    {
      nombre: 'Lista P.E.V',
      presidente: 'Bruno Buasso',
      vicepresidente: 'Bruno Distefano',
      logo: 'assets/pev.png'
    },
    {
      nombre: 'Lista MIVP',
      presidente: 'Aldana Masnovo',
      vicepresidente: 'Guadalupe Villanueva',
      logo: 'assets/mivp.png'
    },
    {
      nombre: 'Voto en blanco',
      presidente: 'No se selecciona ningún candidato',
      vicepresidente: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Blanco.svg/1200px-Blanco.svg.png'
    }
  ];

  constructor(private router: Router, public seleccionService: SeleccionService) {}

  selectOption(option: string) {
    this.seleccionService.presidentSelection = option;
    this.updateNextButtonState();
  }

  nextPage(page: string) {
    if (page === 'secretary') {
      if (this.seleccionService['presidentSelection']) {
        // Guardar la selección en el servicio antes de navegar
        this.seleccionService.presidentSelection = this.seleccionService['presidentSelection'];
        this.router.navigate(['/secretarias']);
      } else {
        alert('Por favor, elige una opción antes de continuar.');
      }
    }
  }

  goBack() {
    this.router.navigate(['/sistema']);
  }

  private updateNextButtonState() {
    const nextBtn = document.getElementById('nextBtn');
    const presidentSelection = this.seleccionService['presidentSelection'];
    const secretarySelection = this.seleccionService['secretarySelection'];

    if (presidentSelection === 'Voto en blanco' || secretarySelection === 'Voto en blanco') {
      nextBtn?.removeAttribute('disabled');
    } else if (presidentSelection && secretarySelection && presidentSelection === secretarySelection) {
      nextBtn?.setAttribute('disabled', 'true');
      alert('No puedes seleccionar la misma lista para presidente y secretaria.');
    } else {
      nextBtn?.removeAttribute('disabled');
    }
  }
}
