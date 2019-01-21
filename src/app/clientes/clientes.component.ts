import { Component, OnInit } from '@angular/core';
//se importa la clase Cliente
import {Cliente} from './cliente';
//se importa la clase servicio
import{ClienteService} from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

clientes: Cliente[];
//define atributo y a su vez injecta el valor
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    //se debe suscribir al metodo para detectar cambios
    this.clienteService.getclientes().subscribe(
      //si hay mas de un parametro se debe usar ()
      (clientes) => this.clientes = clientes
    );
  }

}
