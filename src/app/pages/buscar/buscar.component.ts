import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { 
    this.activatedRoute.params.subscribe( (params:Params) => {
      this.buscar(params['termino']);
  });
}

  ngOnInit() {
  }

  private buscar(termino: string) {
    
    console.log("buscando algo termino=",termino);

    this.http.get(`${environment.urlServicios}/busqueda/algo/${termino}`).subscribe((resp:any) => {

        console.log("resultado buscar algo" , resp);

        this.usuarios = resp.usuarios;
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
    });
  }

}
