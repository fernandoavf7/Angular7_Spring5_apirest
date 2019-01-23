import { Component, OnInit } from '@angular/core';
import {Mascota} from './mascota';
import {MascotaService} from './mascota.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-mascotas',
  templateUrl: './form_mascota.component.html'
})

export class FormMascotaComponent implements OnInit {

private titulo:string = "Crear Mascota";
private mascota:Mascota = new Mascota();

  constructor(private mascotaService: MascotaService,
    private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.mascotaService.getMascota(id)
        .subscribe((mascota)=> this.mascota = mascota)
      }
    });
  }



 create():void{
  //console.log("Clicked!");
  //console.log(this.mascota);
  auxCliente:Mascota;
  this.mascotaService.createMascota(this.mascota)
  .subscribe(mascota => {
    //redirige
  this.router.navigate(['/mascotas'])
  //muestra mensaje de exito
  swal.fire('Nuevo mascota', `Mascota ${mascota.nombre} creado con éxito`,'success')
  }
  );
  //tambien puede ir abajo pero no recibirá el parametro mascota
    //swal.fire('Nuevo mascota', `Mascota creado con éxito`,'success')
}//end method

update():void{
  this.mascotaService.updateMascota(this.mascota)
  .subscribe(mascota => {
    this.router.navigate(['/clientes'])
    swal.fire("Mascota actualizada",`${mascota.nombre} actualizado con éxito!`, "success")
  })
}

}//end class
