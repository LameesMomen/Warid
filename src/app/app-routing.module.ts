import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes:Routes=[
  {
    path:'login',
    loadChildren:()=>import('./pages/login/login.module').then(m=>m.LoginModule),
  },
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : '*',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : '**',
    redirectTo : 'login',
    pathMatch : 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{
      preloadingStrategy : PreloadAllModules,
      useHash : true
    })
  ],
  exports : [
    RouterModule
  ]
})
export class AppRoutingModule { }
