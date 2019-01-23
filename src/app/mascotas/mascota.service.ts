import { Injectable } from '@angular/core';
//se importa la clase Cliente
import { Mascota } from './mascota';
//importa reactive en angular 5 o inferior usar  from 'rxjs/Observable'
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


//injectable representa logica de negocios, se puede injectar en otros archivos
@Injectable({ providedIn: 'root' })
export class MascotaService {

  private urlEndPoint: string = 'http://localhost:8080/api/mascotas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getMascotas(): Observable<Mascota[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Mascota[])
    );
  }


  createMascota(cliente: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(this.urlEndPoint, cliente, { headers: this.httpHeaders })
  }

  getMascota(id): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.urlEndPoint}/${id}`);
  }

  updateMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.urlEndPoint}/${mascota.id}`, mascota, { headers: this.httpHeaders });
  }

  deleteMascota(id: number): Observable<Mascota> {
    console.log(id);
    return this.http.delete<Mascota>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }


}
