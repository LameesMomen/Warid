import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionComponent } from './transaction.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ChatDetailsComponent } from './components/chat-details/chat-details.component';



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
    OrdersComponent,
    OrderDetailsComponent,
    ChatDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]

})
export class TransactionModule { }
