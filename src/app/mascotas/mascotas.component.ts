import { Component, OnInit } from '@angular/core';
import { Mascota } from './mascota';
import { MascotaService } from './mascota.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html'
})
export class MascotasComponent implements OnInit {

  mascotas: Mascota[];
  constructor(private mascotaService: MascotaService) { }

  ngOnInit() {
    this.mascotaService.getMascotas().subscribe(
      (mascotas) => this.mascotas = mascotas
    );
  }

  delete(mascota: Mascota): void {
    swal.fire({
      title: 'Eliminar',
      text: `¿Está segur@ de que desea eliminar la mascota ${mascota.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.value) {
        console.log(mascota.id);
        this.mascotaService.deleteMascota(mascota.id).subscribe(
          response => {
            //esto es para que desaparezca de la tabla el cliente eliminado
            this.mascotas = this.mascotas.filter(m => m !== mascota)
            swal.fire(
              'Eliminado!',
              'Se ha eliminado la mascota',
              'success'
            )
          }
        )

      }
    })
  }

}
