import { Injectable } from '@angular/core';
//se importan los clientes desde un archivo .json, (no se coloca la extension .ts)
import {CLIENTES} from './clientes.json';
//se importa la clase Cliente
import {Cliente} from './cliente';
//importa reactive en angular 5 o inferior usar  from 'rxjs/Observable'
import{of, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


//injectable representa logica de negocios, se puede injectar en otros archivos
@Injectable({providedIn: 'root'})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  //se inyecta la dependencia httpclient en el constructor
  constructor(private http: HttpClient) { }

  //debe retornar un Stream por lo tanto un Observable que contendra un listado de clientes
  //observables se suscriben al objeto y si existre un cambio se gatilla un proceso o tarea
  getclientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    
    //castea el tipo "any" de angular a un array del objeto Cliente
    //return this.http.get<Cliente[]>(this.urlEndPoint);

    //otra forma de cast, mapeando el response al array de objeto Cliente
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }
}
