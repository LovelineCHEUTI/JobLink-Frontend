import { Routes } from '@angular/router';

export const providerRoutes: Routes = [
  { path: 'dashboard',    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'requests',     loadComponent: () => import('./requests/requests').then(m => m.Requests) },
  { path: 'services',     loadComponent: () => import('./services/services').then(m => m.Services) },
  { path: 'profile',      loadComponent: () => import('./profile/profile').then(m => m.Profile) },
  { path: 'subscription', loadComponent: () => import('./subscription/subscription').then(m => m.Subscription) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];