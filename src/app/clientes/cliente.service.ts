import { Injectable } from '@angular/core';
//se importan los clientes desde un archivo .json, (no se coloca la extension .ts)
import {CLIENTES} from './clientes.json';
//se importa la clase Cliente
import {Cliente} from './cliente';
//importa reactive en angular 5 o inferior usar  from 'rxjs/Observable'
import{of, Observable} from 'rxjs';


//injectable representa logica de negocios, se puede injectar en otros archivos
@Injectable({providedIn: 'root'})
export class ClienteService {

  constructor() { }

  //debe retornar un Stream por lo tanto un Observable que contendra un listado de clientes
  //observables se suscriben al objeto y si existre un cambio se gatilla un proceso o tarea
  getclientes(): Observable<Cliente[]>{
    return of(CLIENTES);
  }
}
