import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import {ClienteService} from './clientes/cliente.service';
//se importan RouterModule y routes para hacer el redireccionamiento
import {RouterModule, Routes} from '@angular/router';

//se crea un array de rutas para redireccionar las urls
//por defecto o home redirije a clientes
const routes: Routes = [
  {path:'', redirectTo: '/clientes',pathMatch: 'full'},
  {path:'directivas', component: DirectivaComponent},
  {path:'clientes',  component: ClientesComponent},
]



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
