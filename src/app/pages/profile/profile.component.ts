import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService} from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  img: File;
  previewImg: any;

  constructor(private _usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  modificarUsuario(f: Usuario) {
    console.log("modificarUsuario", f);
    this._usuarioService.modificarUsuario(f).subscribe( resp => {
      console.log("resultado modificacion", resp);
    }, (err) => {
      console.log("error durane modificacion", err);
    });
  }

  // see https://w3path.com/new-angular-8-file-upload-or-image-upload/
  previsualizarImagen(file: any) {
    this.img = file.target.files[0];
    if (this.img == null) {
        return;
    }
    console.log("previsualizarImagen", file, this.img);

    var reader = new FileReader();
    reader.readAsDataURL(this.img);
    reader.onload = (_event) => {
      this.previewImg = reader.result;
    }
  }

  modificarImagen() {
    console.log("modificarImagen", this.img);

    //Call to promise
    this._usuarioService.actualizarImagen(this.img).then( (resp:any) => {
      //Limpiar datos de formulario
      this.img = null;
      this.previewImg = null;

    }).catch( (err) => {
      console.log("error durante modificacion", err);
      this.previewImg = null;
    });
  }
}
