import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { LoginComponent } from './acceso/autoridades/login/login.component';
import { ConsultarDniComponent } from './acceso/autoridades/consultar-dni/consultar-dni.component';
import { VerificarDniComponent } from './acceso/estudiantes/verificar-dni/verificar-dni.component'; 
import { IonicModule } from '@ionic/angular';
import { ElegirSistemaComponent } from './votacion/elegir-sistema/elegir-sistema.component';
import { ListaCompletaComponent } from './votacion/listaCompleta/presidencias/lista-completa.component';
import { FinalStepComponent } from './votacion/final-step/final-step.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConsultarDniComponent,
    VerificarDniComponent,
    ElegirSistemaComponent,
    ListaCompletaComponent,
    FinalStepComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    [FormsModule], 
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
