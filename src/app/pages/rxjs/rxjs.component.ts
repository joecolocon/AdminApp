import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter} from 'rxjs/operators';
      

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {

    this.subscripcion=this.getObservable().pipe( 
      map((value) => value.valor ), 
      filter( (valor, index) => index % 2 === 0), 
      retry(1)
    ).subscribe(
      data => { console.log('subscriptor ', data); },
      (error) => { console.log('subs error', error); },
      () =>  {console.log('subs terminó'); } 
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
    console.log("rxjs unsubscribed");
  }

  getObservable(): Observable<any> {

    const obs:Observable<any> = new Observable(observer => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;
        const salida = { valor: contador };
        observer.next(salida);
        if (contador >= 10) {
           clearInterval(intervalo);
           observer.complete();
        }

        // if (contador === 10) {
        //   clearInterval(intervalo);
        //   observer.error('auxilio');
        // }
      }, 1000);
    });

    return obs;
  }

}
