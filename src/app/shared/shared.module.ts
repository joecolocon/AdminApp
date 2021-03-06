import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { APP_ROUTES } from '../app.routes';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule, 
        PipesModule
    ],

    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent],
    providers: [],
})
export class SharedModule { }
