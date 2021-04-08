import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'create-user',
    children:[
      {
        path:'',
        loadChildren: () => import('./create-user/create-user.module').then( m => m.CreateUserPageModule),
        canActivate:[AuthGuard],
        data: {
          role: 'admin'
        }
      },
      {
        path:':user',
        loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
      }
    ]

  },
  {
    path: 'users',
    children:[
      {
        path:'',
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule),
        canActivate:[AuthGuard],
        data: {
          role: 'admin'
        }
      },
      {
        path:':user',
        loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule),
        canActivate:[AuthGuard],
        data: {
          role: 'admin'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
