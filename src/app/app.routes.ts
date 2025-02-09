import { Routes } from '@angular/router';

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
