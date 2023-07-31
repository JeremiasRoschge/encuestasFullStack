import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {
  presidentSelection: string | undefined;
  secretarySelection: string | undefined;
}
