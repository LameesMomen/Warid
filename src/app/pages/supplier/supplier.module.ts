import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddSupplierComponent } from './components/add-supplier/add-supplier.component';
import { ViewSupplierInfoComponent } from './components/view-supplier-info/view-supplier-info.component';
import { SupplierMoneyInfoComponent } from './components/supplier-money-info/supplier-money-info.component';
import { SupplierCommisionComponent } from './components/supplier-commision/supplier-commision.component';
import { SupplierReviewsComponent } from './components/supplier-reviews/supplier-reviews.component';
import { SupplierProductsComponent } from './components/supplier-products/supplier-products.component';



const routes : Routes =[
  {
    path : '',
    component : SupplierComponent
  },
  {
    path : 'search/:mobile',
    component : SupplierComponent
  },
  {
    path : 'addSupplier',
    component : AddSupplierComponent
  },
  {
    path : 'viewSupplier/:id',
    component : ViewSupplierInfoComponent
  },
]


@NgModule({
  declarations: [
    SupplierComponent,
    AddSupplierComponent,
    ViewSupplierInfoComponent,
    SupplierMoneyInfoComponent,
    SupplierCommisionComponent,
    SupplierReviewsComponent,
    SupplierProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class SupplierModule { }
