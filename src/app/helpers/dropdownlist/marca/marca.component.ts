import { Component, OnInit } from '@angular/core';
import { Marca } from '../../marca';
import { MarcaService } from '../marca.service';

@Component({
  selector: 'ddl-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  public marcaSeleccionada:string;
  marcas:Marca[];
  constructor(private marcaService:MarcaService) { }

  ngOnInit() {
    this.marcaService.getMarcas().subscribe(
      (listado) => this.marcas = listado
    )
    //console.log(this.marcas);
  }



}
