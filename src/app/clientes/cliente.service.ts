import { Injectable } from '@angular/core';
//se importan los clientes desde un archivo .json, (no se coloca la extension .ts)
import { CLIENTES } from './clientes.json';
//se importa la clase Cliente
import { Cliente } from './cliente';
//importa reactive en angular 5 o inferior usar  from 'rxjs/Observable'
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


//injectable representa logica de negocios, se puede injectar en otros archivos
@Injectable({ providedIn: 'root' })
export class ClienteService {

  //define la url desde donde traer os datos desde el proyecto spring
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  //usado para el metodo crear
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  //se inyecta la dependencia httpclient en el constructor
  constructor(private http: HttpClient, private router: Router) { }

  //debe retornar un Stream por lo tanto un Observable que contendra un listado de clientes
  //observables se suscriben al objeto y si existre un cambio se gatilla un proceso o tarea
  getclientes(): Observable<Cliente[]> {
    //return of(CLIENTES);

    //castea el tipo "any" de angular a un array del objeto Cliente
    //return this.http.get<Cliente[]>(this.urlEndPoint);

    //otra forma de cast, mapeando el response al array de objeto Cliente
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        //redirige
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire("Error", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    console.log(cliente);
    return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        //para retornar los errores que devuelve el server
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire("Error al crear al cliente", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
         //para retornar los errores que devuelve el server
         if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire("Error al actualizar al cliente", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    console.log(id);
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire("Error al eliminar al cliente", e.error.mensaje, "error");
        return throwError(e);
      })
    );
  }

}
