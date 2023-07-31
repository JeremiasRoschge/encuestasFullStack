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
import { DniService } from './services/dni.services';
import { SeleccionService } from './services/seleccion.service';
import { BoletaSeparadaComponent } from './votacion/boleta-separada/presidente/presidente-seleccion.component';
import { SecretariaComponent } from './votacion/boleta-separada/secretaria/secretaria.component';
import { ResumenComponent } from './votacion/boleta-separada/resumen/resumen.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConsultarDniComponent,
    VerificarDniComponent,
    ElegirSistemaComponent,
    ListaCompletaComponent,
    FinalStepComponent,
    BoletaSeparadaComponent,
    SecretariaComponent,
    ResumenComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    [FormsModule], 
    IonicModule.forRoot()
  ],
  providers: [DniService, SeleccionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
