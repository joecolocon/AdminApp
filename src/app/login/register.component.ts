import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/index'
import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales("password", "password2") }
    );

    //Preload of formulario
    this.formulario.setValue({
      nombre: 'Test ',
      correo: 'test@example.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {

    if (this.formulario.invalid) return;

    if (!this.formulario.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
    }
    console.log("value", this.formulario.value);

    let usuario: Usuario = {
      nombre: this.formulario.value.nombre,
      email: this.formulario.value.correo,
      password: this.formulario.value.password
    }

    this.usuarioService.crearUsuario(usuario).subscribe(
      resp => {
        console.log("Usuario creado",resp);
      },
      error => {
        console.log("Error", error);
      }, 
      () => {
        console.log("finalizado");
      }
    );

    //formulario tiene todo lo que necesito.
    //console.log(this.formulario);
  }

  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {
      const val1 = group.controls[campo1].value;
      const val2 = group.controls[campo2].value;
      if (val1 !== val2) {
        return { sonIguales: true };
      }
      return null;
    };
  }

}
