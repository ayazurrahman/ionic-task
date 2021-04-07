import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        loadChildren: () => import('./create-user/create-user.module').then( m => m.CreateUserPageModule)
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
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
      },
      {
        path:':user',
        loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
