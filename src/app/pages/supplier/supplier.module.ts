import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupplierComponent } from './supplier.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';



const routes : Routes =[
  {
    path : '',
    component : SupplierComponent
  },
  {
    path : 'order/:id',
    component : OrderDetailComponent
  }
]

@NgModule({
  declarations: [
    SupplierComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ]
})
export class SupplierModule { }
