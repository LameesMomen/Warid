import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientComponent } from './client.component';
import { OrderDetailsComponent } from './order-details/order-details.component';



const routes : Routes =[
  {
    path : '',
    component : ClientComponent
  },
  {
    path : 'order/:id',
    component : OrderDetailsComponent
  }
]

@NgModule({
  declarations: [
    ClientComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ]
})
export class ClientModule { }
