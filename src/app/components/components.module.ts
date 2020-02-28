import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent, GraficoDonaComponent, ModalUploadComponent } from './';

import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        ChartsModule,
        PipesModule
    ],
    exports: [
        IncrementadorComponent,
        GraficoDonaComponent,
        ModalUploadComponent
    ],
    declarations: [
        IncrementadorComponent,
        GraficoDonaComponent,
        ModalUploadComponent
    ],
    providers: []
})
export class ComponentModule { }
