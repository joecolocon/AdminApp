import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { SubirArchivoService } from './subir-archivo.service';
import { environment } from '../../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private client: HttpClient, private _subirArchivo: SubirArchivoService) {
    console.log("usuario service listo");
    this.cargaStorage();
  }


  cargarUsuarios(desde: number = 0) {

    return this.client.get(environment.urlServicios + '/usuarios?desde='+desde).pipe(
      map((resp:any) => {
        return resp;
      }) 
    );
    
  }

  buscarUsuarios(word: string) {
    return this.client.get(environment.urlServicios + '/busqueda/coleccion/usuarios/'+word).pipe(
      map((resp:any) => {
        return resp;
      }) 
    );
  }

  borrarUsuario(usuario: Usuario) {

    return this.client.delete(environment.urlServicios + '/usuarios/' + usuario._id, { headers: { "Authorization": this.token } }).pipe(
      map((resp:any) => {
        swal.fire('borrar usuario','usuario borrado correctamente','success');
        return resp;
      })  
    );

  }

  /**
   * Retorna un observable de la respuesta a la petición.
   * @param usuario 
   */
  crearUsuario(usuario: Usuario) {
    return this.client.post(environment.urlServicios + '/usuarios', usuario).pipe(
      map((resp: any) => {
        swal.fire('Usuario creado', usuario.email, 'success');
        return resp.body;
      })
      // ,
      // catchError((err: any) => {

      //   if (err.error && err.error.errors && err.error.message) {
      //     swal.fire('Usuario no creado', err.error.errors.message, 'warning');
      //   }

      //   return throwError(err);
      // })
    );
  }

  modificarUsuario(usuarioToEdit: Usuario) {

    //Ignorar cualquier cambio de email del usuario loginado
    if (this.usuario._id === usuarioToEdit._id) {
      usuarioToEdit.email = this.usuario.email;  
    }


    return this.client.put(environment.urlServicios + '/usuarios/' + usuarioToEdit._id, usuarioToEdit, { headers: { "Authorization": this.token } }).pipe(
      tap((resp: any) => {
        if (resp && resp.ok) {

          if (this.usuario._id === resp.usuario._id) {
            this.guardaStorage(this.token, resp.usuario);
          }

          swal.fire('Usuario modificado', usuarioToEdit.nombre, 'success');
        }
      })
      // ,
      // catchError((err: any) => {

      //   if (err.error && err.error.errors && err.error.message) {
      //     swal.fire('Usuario no modificado', err.error.errors.message, 'warning');
      //   }

      //   return throwError(err);
      // })
    );
  }

  actualizarImagen(img: File) {

    if (this.usuario.google) {
      swal.fire('Foto no actualizable para usuarios google', this.usuario.nombre, 'info');
      return new Promise((x:any)=> Promise.resolve(x));
    }

    return this._subirArchivo.subirArchivo(this.token, 'usuarios', this.usuario._id, img).then((resp: any) => {
      this.usuario.img = resp.usuario.img;
      this.guardaStorage(this.token, this.usuario);
      swal.fire('Foto actualizada', this.usuario.nombre, 'success');
    }
    );
  }


  loginGoogle(token: string) {
    return this.client.post(environment.urlServicios + '/login/google', { 'token': token }).pipe(

      map((resp: any) => {
        if (resp.ok) {
          this.guardaStorage(resp.token, resp.body);
        }

        return resp;
      })

    );

  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    return this.client.post(environment.urlServicios + '/login', usuario).pipe(
      map((resp: any) => {
        if (resp.ok) {
          this.guardaStorage(resp.token, resp.body);
        }

        return resp;
      })
    );

  }

  logout() {
    console.log("logout called");
    this.token = null;
    this.usuario = null;
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem('usuario');
  }

  private cargaStorage() {
    this.token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
    this.usuario = localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")) : null;
  }

  private guardaStorage(token: string, usuario: Usuario) {
    localStorage.setItem("id", usuario._id);
    localStorage.setItem("token", token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.token = token;
    this.usuario = usuario;
  }
}
