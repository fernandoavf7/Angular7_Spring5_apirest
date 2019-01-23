import { Component, OnInit } from '@angular/core';
//se importa la clase Cliente
import { Cliente } from './cliente';
//se importa la clase servicio
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';


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

  delete(cliente: Cliente): void {
    swal.fire({
      title: 'Eliminar',
      text: `¿Está segur@ de que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.value) {
        console.log(cliente.id);
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            //esto es para que desaparezca de la tabla el cliente eliminado
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire(
              'Eliminado!',
              'Se ha eliminado al cliente',
              'success'
            )
          }
        )

      }
    })
  }

}
