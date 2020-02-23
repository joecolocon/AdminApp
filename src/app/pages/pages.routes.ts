
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

import { SidebarService, LoginGuard } from '../services'

const pageRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuard ], 
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'TABLERO' } },
      { path: 'graficas1', component: Graficas1Component, data: { titulo: 'GRAFICAS' } },
      { path: 'progress', component: ProgressComponent,data: { titulo: 'PROGRESO' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'PROMESAS' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'OBSERVABLES' }},
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'CONFGURACION' } },
      { path: 'perfil', component: ProfileComponent, data: { titulo: 'PERFIL' } },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pageRoutes);
