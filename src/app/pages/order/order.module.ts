import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderComponent } from './order.component';



const routes : Routes =[
  {
    path : '',
    component : OrderComponent
  },
//   {
//     path : 'search/:mobile',
//     component : SupplierComponent
//   },
//   {
//     path : 'addSupplier',
//     component : AddSupplierComponent
//   },
//   {
//     path : 'viewSupplier/:id',
//     component : ViewSupplierInfoComponent
//   },
]


@NgModule({
  declarations: [
OrderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderModule { }
