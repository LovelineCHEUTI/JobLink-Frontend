import { Routes } from '@angular/router';

export const clientRoutes: Routes = [
  { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },
  { path: 'search', loadComponent: () => import('./search/search').then(m => m.Search) },
  { path: 'provider/:id', loadComponent: () => import('./provider-detail/provider-detail').then(m => m.ProviderDetail) },
  { path: 'request/:id', loadComponent: () => import('./request-form/request-form').then(m => m.RequestForm) },
  { path: 'my-requests', loadComponent: () => import('./my-requests/my-requests').then(m => m.MyRequests) },
  { path: 'review/:id', loadComponent: () => import('./review-form/review-form').then(m => m.ReviewForm) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];