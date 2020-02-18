import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( private client: HttpClient) {
    console.log("usuario service listo");
    this.cargaStorage();
  }

  /**
   * Retorna un observable de la respuesta a la petición.
   * @param usuario 
   */
  crearUsuario( usuario: Usuario) {
    return this.client.post( environment.urlServicios+'/usuarios', usuario).pipe(
      map( (resp: any) =>  {
         swal.fire('Usuario creado', usuario.email, 'success' );
         return resp.body;
      } ),
      catchError((err:any) => {

        if (err.error && err.error.errors && err.error.message) {
           swal.fire('Usuario no creado', err.error.errors.message, 'warning' );
        }

        return throwError(err);
    })
    );
  }


  loginGoogle(token:string) {
    return this.client.post( environment.urlServicios+'/login/google', { 'token': token } ).pipe(

      map( (resp: any) =>  {
         if (resp.ok) {
          // swal('login correcto', usuario.email, 'success' );
          this.guardaStorage(resp.token, resp.body);
         }

         return resp;
      } )

    );
  
  }

  login( usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    return this.client.post( environment.urlServicios+'/login', usuario).pipe(
      map( (resp: any) =>  {
         if (resp.ok) {
          // swal('login correcto', usuario.email, 'success' );
          this.guardaStorage(resp.token, resp.body);
         }

         return resp;
      } )
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

  private guardaStorage(token:string, usuario:Usuario) {
    localStorage.setItem("id", usuario._id);
    localStorage.setItem("token",token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.token = token;
    this.usuario = usuario;
  }
}
