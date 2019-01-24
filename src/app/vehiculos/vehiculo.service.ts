import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Vehiculo } from './vehiculo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private urlEndPoint: string = 'http://localhost:8080/api/vehiculos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }


  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Vehiculo[])
    );
  }

  createVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.urlEndPoint, vehiculo, { headers: this.httpHeaders })
  }

  getVehiculo(id): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.urlEndPoint}/${id}`);
  }

  updateVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.urlEndPoint}/${vehiculo.id}`, vehiculo, { headers: this.httpHeaders });
  }

  deleteVehiculo(id: number): Observable<Vehiculo> {
    console.log(id);
    return this.http.delete<Vehiculo>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }
}//end class
