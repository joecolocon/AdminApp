import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/index';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

//declare function init_plugins();   //decimos a typescript que hay una funcion en el html y que confie en su uso
declare const gapi: any;            // decimos a typescript que confie que existe en el javascript esta variable.

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  password: string = '';
  auth2: any;

  constructor(private ngZone:NgZone, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {

    //init_plugins();
    this.usuarioService.logout();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) this.recuerdame = true;
  }

  googleInit() {
    //from https://developers.google.com/identity/sign-in/web/listeners
    console.log("gapi",gapi);

    gapi.load('auth2', () => {

      this.auth2=gapi.auth2.init({
        client_id: '270080688754-iq4mrtj3jpt35k0crdfi4760ppi3elbq.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      //let profile = googleUser.getBasicProfile();
      //console.log("google profile", profile);
      let token=googleUser.getAuthResponse().id_token;
      console.log("token", token);

      this.usuarioService.loginGoogle(token).subscribe(
        (resp) => {
          console.log("Login google correcto", resp);
          //this.router.navigateByUrl('/dashboard');  // BUG del template. no funciona como se espera en el template.
          //this.navigate(['dashboard']);
          window.location.href='#/dashboard';
          window.location.reload(false);
        },
        (error) => {
          console.log("error durante login google", error);
        }
      );
  
  
    });
  }

  ingresar(f: NgForm) {
    if (f.invalid) return;
    let usuario: Usuario = {
      nombre: null,
      email: f.value.email,
      password: f.value.password
    }
    this.usuarioService.login(usuario, this.recuerdame).subscribe(
      (resp) => {
        console.log("Login correcto", resp);
        //this.router.navigateByUrl('/dashboard');
        //this.navigate(['dashboard']);
        window.location.href='#/dashboard';
        window.location.reload(false);
    },
      (error) => {
        console.log("error durante login", error);
      }
    );

  }

  public navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
}
}
