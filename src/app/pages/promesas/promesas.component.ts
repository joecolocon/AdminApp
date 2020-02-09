import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    const promesa = this.contar3();

    promesa.then(
      (msg) => { console.log('Promesa done', msg); }
    ).catch((error) => {
      console.log('Promesa error', error);
    });
  }

  ngOnInit() {
  }

  contar3(): Promise<boolean> {
    const promesa = new Promise<boolean>((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;
        console.log('contador', contador);
        if (contador === 3) { clearInterval(intervalo); resolve(true); }
      }, 1000);

    });

    return promesa;
  }

}
