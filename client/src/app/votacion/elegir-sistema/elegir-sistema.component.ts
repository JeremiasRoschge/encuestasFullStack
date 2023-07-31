import { Component } from '@angular/core';

@Component({
  selector: 'app-elegir-sistema',
  templateUrl: './elegir-sistema.component.html',
  styleUrls: ['./elegir-sistema.component.css']
})
export class ElegirSistemaComponent {
  selectedVotacion: string | null = null;

  seleccionarVotacion(votacion: string) {
    this.selectedVotacion = votacion;
  }

  siguientePagina() {
    if (this.selectedVotacion) {
      if (this.selectedVotacion === 'completa') {
        window.location.href = '/listaCompleta';
      } else if (this.selectedVotacion === 'separado') {
        window.location.href = '/presidencia';
      }
    } else {
      alert('Debes seleccionar una opción antes de continuar');
    }
  }
}
