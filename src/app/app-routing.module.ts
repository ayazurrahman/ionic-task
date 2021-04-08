import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'user-dash',
    loadChildren: () => import('./user-dash/user-dash.module').then( m => m.UserDashPageModule),
    canActivate:[AuthGuard],
    data: {
      role: 'user'
    }
  },
  {
    path:':user-dash',
    loadChildren: () => import('./user-dash/user-dash.module').then( m => m.UserDashPageModule),
    canActivate:[AuthGuard],
    data: {
      role: 'user'
    }

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
