import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, ModalUploadService } from '../../services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarioLogado: Usuario;
  usuarios: Usuario[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = false;
  termino: string;

  constructor(private usuarioService: UsuarioService, private modalUploadService:ModalUploadService) {
    this.usuarioLogado=this.usuarioService.usuario;
    this.cargarUsuarios();
  }

  ngOnInit() {
    this.modalUploadService.notificacion.subscribe((resp) => {

      //Refrescar la pantalla en curso (notificación de cambio)
      if (this.termino) {
        this.buscarUsuarios(this.termino);
      } else {
       this.cambiarDesde(0);
      }
      
    });
  }

  cargarUsuarios() {
    this.termino = null;
    this.cargando = true;
    this.usuarioService.cargarUsuarios().subscribe((resp: any) => {
      console.log("cargarUsuarios", resp);
      this.usuarios = resp.usuarios;
      this.total = resp.total;
      this.cargando = false;
    }, (error: any) => {
      console.log("Error cargarUsuarios", error);
      this.cargando = false;
    });
  }

  buscarUsuarios(termino: string) {

    if (!termino) return this.cargarUsuarios();

    this.termino = termino;
    this.cargando = true;
    this.usuarioService.buscarUsuarios(termino).subscribe((resp: any) => {
      console.log("buscarUsuarios", resp);
      this.usuarios = resp.usuarios;
      this.total = this.usuarios.length;
      this.cargando = false;
    }, (error: any) => {
      console.log("Error buscarUsuarios", error);
      this.cargando = false;
    });

  }

  modificarUsuario(usuarioEdit: Usuario) {
    console.log("modificando usuario", usuarioEdit);
    this.usuarioService.modificarUsuario(usuarioEdit).subscribe();

    // Abrir un swal dialog preguntado nombre y email.
    // swal.fire({
    //   title: 'Modificar Usuario',
    //   html:
    //     `<input id="nombre-input1" type="text" class="swal2-input" value="${usuarioEdit.nombre}">
    //      <input id="email-input2" type="mail"  class="swal2-input" value="${usuarioEdit.email}">`,
    //   focusConfirm: false,
    //   allowEscapeKey: true,
    //   showCancelButton: true,
    //   preConfirm: () => {
    //     usuarioEdit.nombre = (document.getElementById('nombre-input1') as HTMLButtonElement).value;
    //     usuarioEdit.email = (document.getElementById('email-input2') as HTMLButtonElement).value;
    //     this.cargando = true;
    //     this.usuarioService.modificarUsuario(usuarioEdit).subscribe((resp: any) => {
    //       console.log("modificarrUsuarios", resp);
    //       this.cargando = false;
    //     }, (error: any) => {
    //       console.log("Error modificarUsuarios", error);
    //       this.cargando = false;
    //     });
    //   }
    // });

  }

  modificarImagen(usuarioEdit: Usuario) {
    if (usuarioEdit.google) return;
    this.modalUploadService.mostarModal('usuarios',usuarioEdit._id, usuarioEdit.img);
  }

  actualizarImagen(evento: any ) {
    console.log("Evento recibido", evento);
  }

  borrarUsuario(usuario: Usuario) {
    if (!usuario || usuario._id == this.usuarioService.usuario._id) {
      //No se puede borrar a uno mismo.
      swal.fire('Error de borrado', 'No se puede borrar a si mismo', 'warning');
      return;
    }

    swal.fire({ 
      title: 'Esta seguro', 
      text: 'Confirme que quiere borrar el registro', 
      icon: 'warning', 
      allowEscapeKey: true, 
      showCancelButton: true }).then((x: any) => {

      if (!x.value || x.value !== true) return;

      this.cargando = true;
      this.usuarioService.borrarUsuario(usuario).subscribe((resp: any) => {
        console.log("borrarUsuarios", resp);
        this.cargando = false;

        //Reload again.
        if (this.termino) {
          this.buscarUsuarios(this.termino);
        } else {
          this.cambiarDesde(0);
        }

      }, (error: any) => {
        console.log("Error borrarUsuarios", error);
        this.cargando = false;
      });

    });
  }

  cambiarDesde(incremento: number) {
    if ((this.desde + incremento) >= this.total) return;

    const desde = this.desde + incremento;
    if (desde < 0) return;
    if (desde >= this.total) return;

    this.cargando = true;
    this.usuarioService.cargarUsuarios(desde).subscribe((resp: any) => {
      console.log("cambiarDesde", resp);
      this.usuarios = resp.usuarios;
      this.total = resp.total;
      this.desde = desde;
      this.cargando = false;
    }, (error: any) => {
      console.log("Error cambiarDesde", error);
      this.cargando = false;
    });
  }
}
