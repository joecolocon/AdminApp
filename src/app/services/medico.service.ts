import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

import { Medico } from '../models/medico.model';

import { SubirArchivoService } from './subir-archivo.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  
  constructor(private client: HttpClient, private _subirArchivo: SubirArchivoService, private usuarioService: UsuarioService) { }

 cargarMedicos(desde: number = 0):Observable<any> {
   return this.client.get(environment.urlServicios + '/medico?desde=' + desde).pipe(
     map((resp: any) => {
       return resp;
     })
   );
 }

 obtenerMedico(id: string): Observable<Medico> {
   return this.client.get(environment.urlServicios + '/medico/' + id).pipe(
     map((resp: any) => {
       return new Medico(resp.medico.nombre, resp.medico.img, resp.medico.usuario._id, resp.medico.hospital._id, resp.medico._id);
     })
   );
 }

 crearMedico(newMedico: Medico): Observable<Medico> {
   let medico: Medico = { 'nombre': newMedico.nombre, 'hospital': newMedico.hospital };
   return this.client.post(environment.urlServicios + '/medico', medico, { headers: { "Authorization": this.usuarioService.token } }).pipe(
     map((resp: any) => {
       swal.fire('Médico creado', medico.nombre, 'success');
       //Disparar evento para refrescar (mismo tip & trick que la modificación de imagen)
       return resp.body;
     })
   );
 }

 actualizarMedico(medico: Medico):Observable<Medico> {
   return this.client.put(environment.urlServicios + '/medico/' + medico._id, medico, { headers: { "Authorization": this.usuarioService.token } }).pipe(
     map((resp: any) => {
       console.log("modificado médico", resp);
       return resp.medico;
     })
   );
 }

 actualizarImagen(medico: Medico, img: File):Promise<Medico> {
   return this._subirArchivo.subirArchivo(this.usuarioService.token, 'medicos', medico._id, img).then((resp: any) => {
     medico.img = resp.medico.img;
     console.log ("modificada img del médico",medico);
     return medico;
   });
 }


 borrarMedico(id: string): Observable<any> {
   return this.client.delete(environment.urlServicios + '/medico/' + id, { headers: { "Authorization": this.usuarioService.token } }).pipe(
     map((resp: any) => {
       swal.fire('borrar médico', 'médico borrado correctamente', 'success');
       return resp;
     })
   );
 }

 buscarMedico(word: string):Observable<Medico[]> {
   return this.client.get(environment.urlServicios + '/busqueda/coleccion/medicos/' + word).pipe(
     map((resp: any) => {
       return resp.medicos;
     })
   );
 }
 
}
