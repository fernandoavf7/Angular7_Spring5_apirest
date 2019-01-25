import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Marca } from '../marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private urlEndPoint: string = 'http://localhost:8080/api/marcas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http:HttpClient) { }

  getMarcas(): Observable<Marca[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Marca[])
    );
  }
}
