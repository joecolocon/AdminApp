import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse( localStorage.getItem('ajustes'));
    }
  }

  aplicarCheck( link: Element) {
    const selectores: HTMLCollectionOf<Element> = document.getElementsByClassName('selector');

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < selectores.length ; i++) {
      const element: Element = selectores[i];
      element.classList.remove('working');
    }

    link.classList.add('working');

  }

  public aplicarTema(tema: string) {
    const temaUrl = `assets/css/colors/${tema}.css`;
    this.document.getElementById('tema').setAttribute('href', temaUrl);
    this.ajustes = { tema, temaUrl };
    this.guardarAjustes();
  }

}


export interface Ajustes {
  temaUrl: string;
  tema: string;
}
