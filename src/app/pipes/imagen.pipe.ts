import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuario'): any {
    if (tipo === 'usuario' && imagen && imagen.indexOf("http")==0) {
        return imagen;
    } else {
        let grupo="usuarios";
        switch (tipo) {
          case 'medico': grupo='medicos'; break;
          case 'hospital': grupo='hospitales'; break;
          default: break;
        }

        return `${environment.urlServicios}/img/${grupo}/${imagen}`;
    }
  }

}
