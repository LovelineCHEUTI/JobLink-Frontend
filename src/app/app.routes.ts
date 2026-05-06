import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  {
    path: 'auth',
    children: [
      { path: '', loadComponent: () => import('./features/auth/splash/splash').then(m => m.SplashComponent) },
      { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register').then(m => m.Register) },
    ]
  },

  { path: 'client',   loadChildren: () => import('./features/client/client.routes').then(m => m.clientRoutes), canActivate: [authGuard] },
  { path: 'provider', loadChildren: () => import('./features/provider/provider.routes').then(m => m.providerRoutes), canActivate: [authGuard] },
  { path: 'admin',    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes), canActivate: [authGuard] },

  { path: '**', redirectTo: 'auth' }
];