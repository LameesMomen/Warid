import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { AuthdGuard } from './core/guard/authguard.guard';


const routes:Routes=[
  {
    path:'login',
    loadChildren:()=>import('./pages/login/login.module').then(m=>m.LoginModule),
  },
  {
    path:'home',
    component : HomeComponent,
    canActivate :[AuthdGuard],
    children  : [
      {
        path:'client',
        loadChildren:()=>import('./pages/client/client.module').then(m=>m.ClientModule),
      },
      {
        path:'supplier',
        loadChildren:()=>import('./pages/supplier/supplier.module').then(m=>m.SupplierModule),
      },
    ]
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
