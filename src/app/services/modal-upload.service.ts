import { Injectable, EventEmitter, Output } from '@angular/core';
import {UsuarioService } from './usuario.service';
import { SubirArchivoService } from './subir-archivo.service';
import swal from 'sweetalert2';

/**
 * Servicio para utilizar el componente modal de upload service desde cualquier otra pagina basada en la platilla "page"
 */
@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  grupo: string;
  tipo: string;
  id: string;
  img: string;
  oculto: boolean = true;
  previewImg: string | ArrayBuffer;
  notificacion = new EventEmitter<any>();

  constructor(private usuarioService: UsuarioService, private subirArchivosService: SubirArchivoService) { }


  mostarModal(grupo: string, id: string, img: string)  {
    this.grupo = grupo;
    this.id = id;
    this.img = img;
    this.previewImg = null;
    this.oculto = false;
    switch (grupo) {
      case 'usuarios': this.tipo="usuario"; break;
      case 'hospitales': this.tipo="hospital"; break;
      case 'medicos': this.tipo='medico'; break;
      default: this.tipo='usuario'; break;
    }
  }

  ocultarModal() {
    this.oculto = true;
    this.grupo = null;
    this.id = null;
    this.img = null;
    this.previewImg = null;
  }

  subirArchivo(archivo: File) {

    if (!this.grupo || !this.id) {
      this.ocultarModal();
      return;
    }

    this.subirArchivosService.subirArchivo(this.usuarioService.token, this.grupo, this.id, archivo).then((x: any) => {
      this.notificacion.emit(x);
      this.ocultarModal();
      //swal.fire("Subida imagen", "Imagen actualizada correctamente", "success");
    }).catch ( (err:any) => {
      console.log("Error subiendo fichero", err);
      this.ocultarModal();
    });

  }
}
