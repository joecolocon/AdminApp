
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ComponentModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';

import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartsModule,
        SharedModule,
        ComponentModule,
        PAGES_ROUTES
    ],
    exports: [
    ],
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        AccountSettingsComponent
    ],
    providers: [],
})
export class PagesModule { }
