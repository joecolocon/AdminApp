import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private route:Router, private usuarioService:UsuarioService) {

  }
  canActivate(): boolean {
    let resp=this.usuarioService.token != null;   //is not null or undefined
    console.log("Paso por loginGuardGuard -- canActivate =",resp);
    if (!resp) {
      // redirect to login.
      this.usuarioService.logout();
      this.route.navigate(['/login']);
    }  
    return resp;
  }
  
}
