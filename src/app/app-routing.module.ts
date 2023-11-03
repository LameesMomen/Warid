import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { AuthdGuard } from './core/guard/authguard.guard';


const routes:Routes=[
  {
    path:'',
    component : HomeComponent,
    canActivate :[AuthdGuard],
    children  : [
      {
        path:'category',
        loadChildren:()=>import('./pages/category/category.module').then(m=>m.CategoryModule),
      },

    ]
  },
  {
    path:'login',
    loadChildren:()=>import('./pages/login/login.module').then(m=>m.LoginModule),
  },
  {
    path : '**',
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
