import { Component } from '@angular/core';
import { Login } from "../../models/Login";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login.service";

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
      (response: any) => {
        // Verificar la estructura completa del objeto de respuesta
        console.log(response);

        // Intentar obtener el token del objeto de respuesta
        const token = response;
        console.log(token);

        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/admin/dni']);
          alert('Inicio de sesión exitoso.');
        } else {
          console.log('No se pudo obtener el token del objeto de respuesta.');
          alert('Error en el inicio de sesión. Por favor, inténtalo de nuevo.');
        }
      },
      (error: any) => {
        console.log(error);
        alert('Error en el inicio de sesión. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
  
}
