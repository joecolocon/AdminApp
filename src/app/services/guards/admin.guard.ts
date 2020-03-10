import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService:UsuarioService) {}

  canActivate(){
    if (this.userService.usuario.role  && this.userService.usuario.role === 'ADMIN_ROLE') return true;

    console.log("endpoint bloqueado por ADMIN guard")
    return false;
  }
  
}
