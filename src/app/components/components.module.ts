import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule],
    exports: [
        IncrementadorComponent
    ],
    declarations: [
        IncrementadorComponent
    ],
    providers: []
})
export class ComponentModule { }
