import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
//se importan RouterModule y routes para hacer el redireccionamiento
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
//importa formulario
import { FormsModule } from '@angular/forms';
import { MascotasComponent } from './mascotas/mascotas.component';
import { FormMascotaComponent } from './mascotas/form_mascota.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { FormVehiculoComponent } from './vehiculos/form-vehiculo/form-vehiculo.component';
import { MarcaComponent } from './helpers/dropdownlist/marca/marca.component';

//se crea un array de rutas para redireccionar las urls
//por defecto o home redirije a clientes
const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  //clientes
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/form', component: FormComponent },
  { path: 'clientes/form/:id', component: FormComponent },
  //mascotas  
  { path: 'mascotas', component: MascotasComponent },
  { path: 'mascotas/form', component: FormMascotaComponent },
  { path: 'mascotas/form/:id', component: FormMascotaComponent },
  //vehiculo routes
  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'vehiculos/form', component: FormVehiculoComponent },
  { path: 'vehiculos/form/:id', component: FormVehiculoComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    MascotasComponent,
    FormMascotaComponent,
    VehiculosComponent,
    FormVehiculoComponent,
    MarcaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
