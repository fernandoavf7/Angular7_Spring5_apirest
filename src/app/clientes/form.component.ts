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

private errores: string[];

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


//create utiliza una 2da manera transformando el objeto response con <string, object> en solo objeto cliente
 create():void{
  //console.log("Clicked!");
  //console.log(this.cliente);
  auxCliente:Cliente;
  this.clienteService.create(this.cliente)
  .subscribe(cliente => {
    //redirige
  this.router.navigate(['/clientes'])
  //muestra mensaje de exito, ejemplo con objeto any 1
  //swal.fire('Nuevo cliente', `Cliente ${json.cliente.nombre} creado con éxito`,'success')
  //ejemplo con objeto any 2, retornando el mensaje desde el backend spring
  swal.fire('Nuevo cliente', `${cliente.nombre} : ${cliente.apellido}`,'success')
  },
  err => {
    this.errores = err.error.errores as string[];
    console.error("Código del error desde el backend");
    console.error(err.error.errores);
  }
  );
  //tambien puede ir abajo pero no recibirá el parametro cliente
    //swal.fire('Nuevo cliente', `Cliente creado con éxito`,'success')
}//end method


update():void{
  this.clienteService.update(this.cliente)
  .subscribe(json => {
    console.log(json);
    this.router.navigate(['/clientes'])
    swal.fire("Cliente actualizado",`El cliente: ${json.cliente.nombre} actualizado con éxito!`, "success")
  },
  err => {
    this.errores = err.error.errores as string[];
    console.error("Código del error desde el backend");
    console.error(err.error.errores);
  }
  
  )
}

}//end class
