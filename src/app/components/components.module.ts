import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { CommonModule } from '@angular/common';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        ChartsModule
    ],
    exports: [
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    declarations: [
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    providers: []
})
export class ComponentModule { }
