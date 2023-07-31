import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeleccionService } from '../../../services/seleccion.service';

interface Secretaria {
  nombre: string;
  secretariaGeneral: string;
  viceSecretaria: string;
  logo: string;
}

@Component({
  selector: 'app-secretaria-seleccion',
  templateUrl: './secretaria.component.html',
  styleUrls: ['./secretaria.component.css']
})
export class SecretariaComponent {
  candidatos: Secretaria[] = [
    {
      nombre: 'Lista PEV',
      secretariaGeneral: 'Bradley Bazan',
      viceSecretaria: 'Esteban Correa',
      logo: './assets/2.png'
    },
    {
      nombre: 'Lista MIVP',
      secretariaGeneral: 'Ludmila Carabajal',
      viceSecretaria: 'Lourdes D\'Andrea',
      logo: './assets/4.png'
    },
    {
      nombre: 'Voto en blanco',
      secretariaGeneral: 'No se selecciona ninguna candidata',
      viceSecretaria: '',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Blanco.svg/1200px-Blanco.svg.png'
    }
  ];

  constructor(private router: Router, public seleccionService: SeleccionService) {}

  selectOption(option: string) {
    const presidentSelection = this.seleccionService['presidentSelection'];

    // Verificar si la opción seleccionada para secretaria es diferente de la opción seleccionada para presidente
    if (presidentSelection && presidentSelection === option) {
      alert('No puedes seleccionar la misma lista para presidente y secretaria.');
    } else {
      // Actualizar la selección de secretaria solo si no es la misma que la selección de presidente
      this.seleccionService.secretarySelection = option;
      this.updateNextButtonState();
    }
  }

  goBack() {
    this.router.navigate(['/sistema']);
  }

  nextPage(page: string) {
    if (page === 'summary') {
      if (this.seleccionService['secretarySelection']) {
        this.router.navigate(['/resumen'], {
          queryParams: {
            presidentSelection: this.seleccionService.presidentSelection,
            secretarySelection: this.seleccionService.secretarySelection
          }
        });
      } else {
        alert('Por favor, elige una opción antes de continuar.');
      }
    }
  }

  private updateNextButtonState() {
    const nextBtn = document.getElementById('nextBtn');
    const presidentSelection = this.seleccionService['presidentSelection'];
    const secretarySelection = this.seleccionService['secretarySelection'];

    if (presidentSelection === 'Voto en blanco' || secretarySelection === 'Voto en blanco') {
      nextBtn?.removeAttribute('disabled');
    } else if (presidentSelection && secretarySelection && presidentSelection === secretarySelection) {
      nextBtn?.setAttribute('disabled', 'true');
    } else {
      nextBtn?.removeAttribute('disabled');
    }
  }
}
