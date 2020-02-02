import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() porcentaje = 50;

  @Input() leyenda = 'leyenda';

  @ViewChild('txtPorcentaje', { static: false }) txtPorcentaje: ElementRef;

  // the suffix Change indicates input/output
  // https://blog.angulartraining.com/tutorial-create-your-own-two-way-data-binding-in-angular-46487650ea82
  // tslint:disable-next-line: no-output-rename
  @Output('porcentajeChange') cambioValor: EventEmitter<number> = new EventEmitter();


  constructor() {
    console.log('leyenda', this.leyenda);
    console.log('porcentaje', this.porcentaje);
  }

  ngOnInit() {
  }

  incrementa(cantidad: number) {
    if (this.porcentaje >= 0 && this.porcentaje <= 100) { this.porcentaje += cantidad; }
    this.emitPorcentaje();
  }

  porcentajeSet(porcentaje: number) {
    this.porcentaje = porcentaje;
    this.emitPorcentaje();
  }

  private emitPorcentaje() {
    if (this.porcentaje < 0) { this.porcentaje = 0; }
    if (this.porcentaje > 100) { this.porcentaje = 100; }
    this.txtPorcentaje.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
    this.txtPorcentaje.nativeElement.focus();
  }

}
