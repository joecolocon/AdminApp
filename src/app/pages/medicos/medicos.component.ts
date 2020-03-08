import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { ModalUploadService, MedicoService } from 'src/app/services';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = false;
  termino: string;

  constructor(private medicoService: MedicoService, private modalUploadService: ModalUploadService) {
    this.cargarMedicos();
  }

  ngOnInit() {
    this.modalUploadService.notificacion.subscribe(() => {
      this.reload();
    });
  }

  private cargarMedicos() {
    this.termino = null;
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((resp: any) => {
      console.log("cargarMedicos", resp);
      this.medicos = resp.medicos;
      this.total = resp.total;
      this.cargando = false;
    }, (error: any) => {
      console.log("Error cargarMedicos", error);
      this.cargando = false;
    });
  }

  buscarMedicos(termino: string) {

    if (!termino) return this.cargarMedicos();

    this.termino = termino;
    this.cargando = true;
    this.medicoService.buscarMedico(termino).subscribe((resp: Medico[]) => {
      console.log("buscarMedicos", resp);
      this.medicos = resp;
      this.total = this.medicos.length;
      this.cargando = false;
    }, (error: any) => {
      console.log("Error buscarMedicos", error);
      this.cargando = false;
    });

  }

  cambiarDesde(incremento: number) {
    if ((this.desde + incremento) >= this.total) return;

    const desde = this.desde + incremento;
    if (desde < 0) return;
    if (desde >= this.total) return;

    this.cargando = true;
    this.medicoService.cargarMedicos(desde).subscribe((resp: any) => {
      console.log("cambiarDesde", resp);
      this.medicos = resp.medicos;
      this.total = resp.total;
      this.desde = desde;
      this.cargando = false;
    }, (error: any) => {
      console.log("Error cambiarDesde", error);
      this.cargando = false;
    });
  }

  crearMedico() {
    this.reload();
  }

  modificarMedico(medico: Medico) {
    this.reload();
  }

  modificarImagen(medico: Medico) {
    this.modalUploadService.mostarModal('medicos', medico._id, medico.img);
  }



  borrarMedico(medico: Medico) {
    this.cargando = true
    this.medicoService.borrarMedico(medico._id).subscribe(() => {
      this.reload();
    });
  }


  private reload() {
    if (this.termino) {
      this.buscarMedicos(this.termino);
    } else {
      this.cargarMedicos();
    }
  }

}
