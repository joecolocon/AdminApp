import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, ModalUploadService } from '../../services';
import swal from 'sweetalert2'
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = false;
  termino: string;

  constructor(private hospitalService: HospitalService, private modalUploadService: ModalUploadService) {
    this.cargarHospitales();
  }

  ngOnInit() {
    this.modalUploadService.notificacion.subscribe(() => {
      this.reload();
    });
  }

  private cargarHospitales() {
    this.termino = null;
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((resp: any) => {
      console.log("cargarHospitales", resp);
      this.hospitales = resp.hospitales;
      this.total = resp.total;
      this.cargando = false;
    }, (error: any) => {
      console.log("Error cargarHospitales", error);
      this.cargando = false;
    });
  }

  buscarHospitales(termino: string) {

    if (!termino) return this.cargarHospitales();

    this.termino = termino;
    this.cargando = true;
    this.hospitalService.buscarHospital(termino).subscribe((resp: Hospital[]) => {
      console.log("buscarHospitales", resp);
      this.hospitales = resp;
      this.total = this.hospitales.length;
      this.cargando = false;
    }, (error: any) => {
      console.log("Error buscarHospitales", error);
      this.cargando = false;
    });

  }

  cambiarDesde(incremento: number) {
    if ((this.desde + incremento) >= this.total) return;

    const desde = this.desde + incremento;
    if (desde < 0) return;
    if (desde >= this.total) return;

    this.cargando = true;
    this.hospitalService.cargarHospitales(desde).subscribe((resp: any) => {
      console.log("cambiarDesde", resp);
      this.hospitales = resp.hospitales;
      this.total = resp.total;
      this.desde = desde;
      this.cargando = false;
    }, (error: any) => {
      console.log("Error cambiarDesde", error);
      this.cargando = false;
    });
  }

  crearHospital() {
    console.log("crearHospital: swal");

    // Abrir un swal dialog preguntado nombre de hospital. Al confirmar se crea el hospital sin imagen.
    swal.fire({
      title: 'Crear Hospital',
      html:
        `<input id="nombre-input1" type="text" class="swal2-input" placeholder="Nombre del hospital">`,
      focusConfirm: false,
      allowEscapeKey: true,
      showCancelButton: true,
      preConfirm: () => {
        let nombre: string = (document.getElementById('nombre-input1') as HTMLButtonElement).value;
        this.cargando = true;
        this.hospitalService.crearHospital(nombre).subscribe((resp: Hospital) => {
          console.log("crearHospital", resp);
          this.cargando = false;
          this.reload();
        }, (error: any) => {
          console.log("Error  crearHospital", error);
          this.cargando = false;
        });
      }
    });

  }

  modificarHospital(hospital: Hospital) {
    this.cargando = true
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }

  modificarImagen(hospital: Hospital) {
    this.modalUploadService.mostarModal('hospitales', hospital._id, hospital.img);
  }



  borrarHospital(hospital: Hospital) {
    this.cargando = true
    this.hospitalService.borrarHospital(hospital._id).subscribe(() => {
      this.reload();
    });
  }


  private reload() {
    if (this.termino) {
      this.buscarHospitales(this.termino);
    } else {
      this.cargarHospitales();
    }
  }

}
