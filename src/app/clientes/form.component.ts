import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public titulo:string = "Crear Cliente";
  public cliente:Cliente = new Cliente();

  constructor(private clienteService: ClienteService,
    private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id)
        .subscribe((cliente)=> this.cliente = cliente)
      }
    });
  }



 create():void{
  //console.log("Clicked!");
  //console.log(this.cliente);
  auxCliente:Cliente;
  this.clienteService.create(this.cliente)
  .subscribe(cliente => {
    //redirige
  this.router.navigate(['/clientes'])
  //muestra mensaje de exito
  swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito`,'success')
  }
  );
  //tambien puede ir abajo pero no recibirá el parametro cliente
    //swal.fire('Nuevo cliente', `Cliente creado con éxito`,'success')
}//end method

update():void{
  this.clienteService.update(this.cliente)
  .subscribe(cliente => {
    this.router.navigate(['/clientes'])
    swal.fire("Cliente actualizado",`${cliente.nombre} actualizado con éxito!`, "success")
  })
}

}//end class
