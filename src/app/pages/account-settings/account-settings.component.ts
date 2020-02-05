import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document, private settings: SettingsService ) { }

  ngOnInit() {
    this.selectCurrentTema();
  }


  cambiarColor( tema: string, link: Element ) {

    this.aplicarCheck(link);
    this.settings.aplicarTema(tema);
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

  private selectCurrentTema() {
    const currentTema = this.settings.ajustes.tema;

    // Vamilla javascript
    const selectores: HTMLCollectionOf<Element> = document.getElementsByClassName('selector');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < selectores.length ; i++) {
      const element: Element = selectores[i];
      if (element.getAttribute('data-theme') === currentTema) {
        element.classList.add('working');
        break;
      }
    }

  }


}
