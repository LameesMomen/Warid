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
    path:'',
    component : HomeComponent,
    canActivate :[AuthdGuard],
    children  : [
      {
        path:'category',
        loadChildren:()=>import('./pages/category/category.module').then(m=>m.CategoryModule),
      },
      {
        path:'product',
        loadChildren:()=>import('./pages/product/product.module').then(m=>m.ProductModule),
      },
      {
        path:'locations',
        loadChildren:()=>import('./pages/locations/locations.module').then(m=>m.LocationsModule),
      },
      {
        path:'client',
        loadChildren:()=>import('./pages/client/client.module').then(m=>m.ClientModule),
      },
      {
        path:'supplier',
        loadChildren:()=>import('./pages/supplier/supplier.module').then(m=>m.SupplierModule),
      },
      {
        path:'orders',
        loadChildren:()=>import('./pages/order/order.module').then(m=>m.OrderModule),
      },
      {
        path:'',
        redirectTo : 'product',
        pathMatch : 'full',
      },
      {
        path:'*',
        redirectTo : 'product',
        pathMatch : 'full'
      },
      {
        path:'**',
        redirectTo : 'product',
        pathMatch : 'full'
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
