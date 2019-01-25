import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Marca } from 'src/app/helpers/marca';
import { MarcaComponent } from 'src/app/helpers/dropdownlist/marca/marca.component';

@Component({
  selector: 'app-form-vehiculo',
  templateUrl: './form-vehiculo.component.html',
  styleUrls: ['./form-vehiculo.component.css']
})
export class FormVehiculoComponent implements OnInit {

  public titulo:string = "Crear Vehículo";
  public vehiculo:Vehiculo = new Vehiculo();


  constructor(public vehiculoService: VehiculoService,
    public router: Router,public activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.cargarVehiculo();
  }

  cargarVehiculo():void{
    //console.log("marcaSeleccionada: ");
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.vehiculoService.getVehiculo(id)
        .subscribe((vehiculo)=> this.vehiculo = vehiculo)
      }
    })
  }


  create():void{
    this.vehiculoService.createVehiculo(this.vehiculo)
    .subscribe(vehiculo => {
      this.router.navigate(['vehiculos'])
      Swal.fire("Nuevo vehículo",`Vehiculo ${vehiculo.marca} ${vehiculo.modelo} creado correctamente`,'success')
    })
  }

  update():void{
    this.vehiculoService.updateVehiculo(this.vehiculo)
    .subscribe(vehiculo=> {
      this.router.navigate(['/vehiculos'])
      Swal.fire("Vehículo actualizado", `${vehiculo.modelo} actualizado correctamente`, "success")
    })
  }


}//end class
