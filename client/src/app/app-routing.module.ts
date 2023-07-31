import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from "./home-component/home-component.component";
import { LoginComponent } from './acceso/autoridades/login/login.component';
import { ConsultarDniComponent } from './acceso/autoridades/consultar-dni/consultar-dni.component';
import { VerificarDniComponent } from './acceso/estudiantes/verificar-dni/verificar-dni.component';
import { ElegirSistemaComponent } from "./votacion/elegir-sistema/elegir-sistema.component";
import { ListaCompletaComponent } from './votacion/listaCompleta/presidencias/lista-completa.component';
import { BoletaSeparadaComponent } from './votacion/boleta-separada/presidente/presidente-seleccion.component';
import { FinalStepComponent } from './votacion/final-step/final-step.component';
import { SecretariaComponent } from './votacion/boleta-separada/secretaria/secretaria.component';
import { ResumenComponent } from './votacion/boleta-separada/resumen/resumen.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  {path:'home', component:HomeComponentComponent},
  {path:'login', component:LoginComponent},
  {path:'admin/dni', component: ConsultarDniComponent, canActivate: [AuthGuard]},
  {path:'empezar', component:VerificarDniComponent},
  {path:'sistema', component:ElegirSistemaComponent },
  {path:'listaCompleta', component:ListaCompletaComponent},
  {path: 'presidencia', component:BoletaSeparadaComponent},
  {path: 'secretarias', component:SecretariaComponent},
  {path: 'resumen', component:ResumenComponent},
  {path:'pasoFinal', component:FinalStepComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
