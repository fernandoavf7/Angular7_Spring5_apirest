import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { VehiculoService } from './vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html'
})
export class VehiculosComponent implements OnInit {

  vehiculos: Vehiculo[];
  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit() {
    this.vehiculoService.getVehiculos().subscribe((listado)=> this.vehiculos = listado);
  }

  delete(vehiculo: Vehiculo){
    Swal.fire({
      title: 'Eliminar',
      text: `¿Está segur@ de que desea eliminar el vehiuclo ${vehiculo.modelo}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.value) {
        console.log(vehiculo.id);
        this.vehiculoService.deleteVehiculo(vehiculo.id).subscribe(
          response => {
            this.vehiculos = this.vehiculos.filter(v => v !== vehiculo)
            Swal.fire(
              'Eliminado!',
              'Se ha eliminado el vehiculo',
              'success'
            )
          }
        )

      }
    })//end swal
  }//end delete method

}//end class
