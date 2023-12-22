import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupplierComponent } from './supplier.component';



const routes : Routes =[
  {
    path : '',
    component : SupplierComponent
  }
]

@NgModule({
  declarations: [
    SupplierComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ]
})
export class SupplierModule { }
