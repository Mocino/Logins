import { Routes } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/dashboard/dashboard.module').then(m=>m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
