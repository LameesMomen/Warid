import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddSupplierComponent } from './components/add-supplier/add-supplier.component';



const routes : Routes =[
  {
    path : '',
    component : SupplierComponent
  },
  {
    path : 'addSupplier',
    component : AddSupplierComponent
  },
  // {
  //   path : 'viewClient/:id',
  //   component : ViewPersonalInfoComponent
  // },
]


@NgModule({
  declarations: [
    SupplierComponent,
    AddSupplierComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class SupplierModule { }
