import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CodeInputModule } from 'angular-code-input';
import { ProductComponent } from './product.component';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { ViewProductsComponent } from './components/view-products/view-products.component';
// register Swiper custom elements
register();


const routes : Routes =[
  {
    path : '',
    component : ProductComponent
  }
]

@NgModule({
  declarations: [
    ProductComponent,
    ViewProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CodeInputModule
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]

})
export class ProductModule { }
