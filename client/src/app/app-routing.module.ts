import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from "./home-component/home-component.component";
import { LoginComponent } from './autoridades/login/login.component';
import { ConsultarDniComponent } from './autoridades/consultar-dni/consultar-dni.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'home', component:HomeComponentComponent},
  {path:'login', component:LoginComponent},
  {path:'admin/dni', component: ConsultarDniComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
