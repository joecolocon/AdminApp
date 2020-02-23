import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  public subirArchivo(token: string, grupo: string, id: string, fichero: File) {

    return new Promise((resolve, reject) => {
      console.log("subirImagen", id, fichero);

      const formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('imagen', fichero, fichero.name);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            console.log("Imagen subida");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("error de subida");
            reject(xhr.response);
          }
        }
      };

      let url = `${environment.urlServicios}/upload/${grupo}/${id}`;
      xhr.open('PUT', url, true);
      xhr.setRequestHeader("Authorization", token);
      xhr.send(formData);

    });
  }

}
