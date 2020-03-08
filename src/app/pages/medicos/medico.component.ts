import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from '../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/services';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medico: Medico = { hospital:'' };  // dejar pre-seleccionado el texto "Seleccione hospital"
  hospitales: Hospital[];
  hospital: Hospital = { nombre: '' };

  constructor(private medicoService:MedicoService,
    private hospitalService:HospitalService,
    private modalUploadService: ModalUploadService,
     private route: ActivatedRoute, 
     private router: Router) { 

    
    this.hospitalService.cargarHospitales().subscribe(( x: any) => {
      this.hospitales = x.hospitales;
    } );
  }
  
  ngOnInit() {

    this.medico._id=this.route.snapshot.params.id;
    console.log("Init: medico con id", this.medico._id);

    this.modalUploadService.notificacion.subscribe(() => {
      //reload
      console.log("notified change of image img=",this.medico.img);
      this.reload();
    });

    this.reload();
  }

  private reload() {
    if (this.medico._id !== 'new') {
      this.medicoService.obtenerMedico(this.medico._id).subscribe( (x:Medico) => {
        this.medico = x;
        this.cargarHospital();
      });
    } else {
      this.cargarHospital();
     }
  }

  private cargarHospital() {
    if (this.medico.hospital && this.medico.hospital.length>0) {
      //Cargar el hospital.
      this.hospitalService.obtenerHospital(this.medico.hospital).subscribe((x:Hospital) => {
        console.log ("cargado hospital",x);
        this.hospital = x;
      });
    }
  }
  
  registrarMedico( f: NgForm) {

    if (f.invalid) return;

    if (this.medico._id === 'new') {
      this.medicoService.crearMedico(this.medico).subscribe((x:Medico) => {
          console.log("medico guardado",x);
          this.medico._id=x._id;
          this.reload();
          //this.router.navigateByUrl(`/medico/${x._id}`)
      });
    } else {
      this.medicoService.actualizarMedico(this.medico).subscribe((x:Medico) => {
        console.log("medico actualizado",x);
    });
    }
  }

  cambiaHospital( id: string ) {
    console.log("cambiaHospital", id);
    this.hospitalService.obtenerHospital(id).subscribe((x:Hospital) => {
      this.hospital = x;
      console.log("selected hospital", x);
    });
  }

  cambiarImagen() {
    this.modalUploadService.mostarModal('medicos', this.medico._id, this.medico.img);
  }

}
