import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from "./home-component/home-component.component";
import { LoginComponent } from './acceso/autoridades/login/login.component';
import { ConsultarDniComponent } from './acceso/autoridades/consultar-dni/consultar-dni.component';
import { VerificarDniComponent } from './acceso/estudiantes/verificar-dni/verificar-dni.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'home', component:HomeComponentComponent},
  {path:'login', component:LoginComponent},
  {path:'admin/dni', component: ConsultarDniComponent, canActivate: [AuthGuard]},
  {path:'empezar', component:VerificarDniComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
