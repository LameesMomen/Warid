import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderComponent } from './order.component';
import { LocationOrdersComponent } from './components/location-orders/location-orders.component';
import { LocationOrderDetailComponent } from './components/location-order-detail/location-order-detail.component';



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
  {
    path : 'viewOrder/:id',
    component : LocationOrderDetailComponent
  },
]


@NgModule({
  declarations: [
OrderComponent,
LocationOrdersComponent,
LocationOrderDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderModule { }
