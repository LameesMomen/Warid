import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderComponent } from './order.component';
import { LocationOrderDetailComponent } from './components/location/location-order-detail/location-order-detail.component';
import { LocationOrdersComponent } from './components/location/location-orders/location-orders.component';
import { PaymentOrderComponent } from './components/payment/payment-order/payment-order.component';
import { PaymentOrderDetailsComponent } from './components/payment/payment-order-details/payment-order-details.component';
import { AssociationOrdersComponent } from './components/associations/association-orders/association-orders.component';
import { AssociationOrderDetailComponent } from './components/associations/association-order-detail/association-order-detail.component';




const routes : Routes =[
  {
    path : '',
    component : OrderComponent
  },
//   {
//     path : 'search/:mobile',
//     component : SupplierComponent
//   },
  {
    path : 'viewPaymentDetail/:id',
    component : PaymentOrderDetailsComponent
  },
  {
    path : 'viewLocationDetail/:id',
    component : LocationOrderDetailComponent
  },
  {
    path : 'viewAssociationsDetail/:id',
    component : AssociationOrderDetailComponent
  },
]


@NgModule({
  declarations: [
OrderComponent,
LocationOrdersComponent,
LocationOrderDetailComponent,
PaymentOrderComponent,
PaymentOrderDetailsComponent,
AssociationOrdersComponent,
AssociationOrderDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderModule { }
