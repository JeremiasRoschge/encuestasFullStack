import { Component } from '@angular/core';
import { Login } from "../models/Login";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: Login = new Login();
  datatable: any = [];

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {}

  onPostLogin(): void {
    if (this.login.dni === '' || this.login.password === '') {
      alert('Por favor, ingresa un usuario y contraseña válidos.');
    } else {
      this.loginService.postLogin(this.login).subscribe(
        (token: string) => {
          // Almacenar el token en el almacenamiento local (localStorage)
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
          alert('Inicio de sesión exitoso.');
        },
        (error: any) => {
          alert('Error en el inicio de sesión. Por favor, inténtalo de nuevo.');
        }
      );
    }
  }
}
