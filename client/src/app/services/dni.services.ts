// dni.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DniService {
  private dniConfirmadoKey = 'dniConfirmado';

  guardarDniConfirmado(dni: string) {
    localStorage.setItem(this.dniConfirmadoKey, dni);
  }

  obtenerDniConfirmado(): string | null {
    return localStorage.getItem(this.dniConfirmadoKey);
  }
}
