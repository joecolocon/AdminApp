import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent, GraficoDonaComponent } from './';


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
