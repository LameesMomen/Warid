import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionComponent } from './transaction.component';
import { OrdersComponent } from './components/orders/orders.component';



const routes : Routes =[
  {
    path : '',
    component : TransactionComponent
  },
//   {
//     path : 'search/:mobile',
//     component : ClientComponent
//   },
//   {
//     path : 'addClient',
//     component : AddClientComponent
//   },
  {
    path : 'orders/:id',
    component : OrdersComponent
  },
]

@NgModule({
  declarations: [
    TransactionComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]

})
export class TransactionModule { }
