import { Component } from '@angular/core';
import { SettingsService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AdminPro';

  constructor( private settings: SettingsService ) {
    this.settings.cargarAjustes();
    this.settings.aplicarTema(this.settings.ajustes.tema);
  }
}
