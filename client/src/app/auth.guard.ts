import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Aquí verificamos si el usuario está autenticado utilizando el servicio AuthService
    const token = localStorage.getItem('token');

    if (token) {
      // Si el token existe, validamos el token en el backend utilizando el AuthService
      return this.authService.validateToken(token).pipe(
        map((isValid: boolean) => {
          if (isValid) {
            // Si el token es válido, permitimos la navegación a la ruta protegida
            return true;
          } else {
            // Si el token no es válido o ha expirado, redirigimos al usuario a la página de inicio de sesión
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
    } else {
      // Si no hay token, redirigimos al usuario a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
