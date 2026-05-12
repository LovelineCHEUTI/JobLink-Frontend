import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  { path: 'dashboard',     loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'users',         loadComponent: () => import('./users/users').then(m => m.Users) },
  { path: 'providers',     loadComponent: () => import('./providers/providers').then(m => m.Providers) },
  { path: 'categories',    loadComponent: () => import('./categories/categories').then(m => m.Categories) },
  { path: 'subscriptions', loadComponent: () => import('./subscriptions/subscriptions').then(m => m.Subscriptions) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];