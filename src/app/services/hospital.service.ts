import { Injectable } from '@angular/core';
import { Hospital } from '../models/hospital.model';
import { SubirArchivoService } from './subir-archivo.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { environment } from '../../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  //Current hospital in edition.
  hospital: Hospital;

  constructor(private client: HttpClient, private _subirArchivo: SubirArchivoService, private usuarioService: UsuarioService) { }

  cargarHospitales(desde: number = 0):Observable<any> {
    return this.client.get(environment.urlServicios + '/hospital?desde=' + desde).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  obtenerHospital(id: string): Observable<Hospital> {
    return this.client.get(environment.urlServicios + '/hospital/' + id).pipe(
      map((resp: any) => {
        return resp.hospital;
      })
    );
  }

  crearHospital(nombre: string): Observable<Hospital> {
    let hospital: Hospital = { nombre };
    return this.client.post(environment.urlServicios + '/hospital', hospital, { headers: { "Authorization": this.usuarioService.token } }).pipe(
      map((resp: any) => {
        swal.fire('Hospital creado', hospital.nombre, 'success');
        //Disparar evento para refrescar (mismo tip & trick que la modificación de imagen)
        return resp.body;
      })
    );
  }

  actualizarHospital(hospital: Hospital):Observable<Hospital> {
    return this.client.put(environment.urlServicios + '/hospital/' + hospital._id, hospital, { headers: { "Authorization": this.usuarioService.token } }).pipe(
      map((resp: any) => {
        console.log("modificado hospital", resp);
        return resp.hospital;
      })
    );
  }

  actualizarImagen(hospital: Hospital, img: File):Promise<Hospital> {
    return this._subirArchivo.subirArchivo(this.usuarioService.token, 'hospitales', hospital._id, img).then((resp: any) => {
      hospital.img = resp.hospital.img;
      console.log ("modificada img del hospital",hospital);
      return hospital;
    });
  }


  borrarHospital(id: string): Observable<any> {
    return this.client.delete(environment.urlServicios + '/hospital/' + id, { headers: { "Authorization": this.usuarioService.token } }).pipe(
      map((resp: any) => {
        swal.fire('borrar hospital', 'hospital borrado correctamente', 'success');
        return resp;
      })
    );
  }

  buscarHospital(word: string):Observable<Hospital[]> {
    return this.client.get(environment.urlServicios + '/busqueda/coleccion/hospitales/' + word).pipe(
      map((resp: any) => {
        return resp.hospitales;
      })
    );

  }

}
