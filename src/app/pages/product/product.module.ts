import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductComponent } from './product.component';

import { ViewProductsComponent } from './components/view-products/view-products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { BoxesViewComponent } from './components/view-products/boxes-view/boxes-view.component';
import { RowsViewComponent } from './components/view-products/rows-view/rows-view.component';


const routes : Routes =[
  {
    path : '',
    component : ProductComponent
  }
]

@NgModule({
  declarations: [
    ProductComponent,
    ViewProductsComponent,
    AddProductComponent,
    BoxesViewComponent,
    RowsViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]

})
export class ProductModule { }
