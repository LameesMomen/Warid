import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CodeInputModule } from 'angular-code-input';
import CategoryComponent from './category.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { AddSubcategoryComponent } from './components/add-subcategory/add-subcategory.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();


const routes : Routes =[
  {
    path : '',
    component : CategoryComponent
  }
]

@NgModule({
  declarations: [
    CategoryComponent,
    SubcategoryComponent,
    AddSubcategoryComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CodeInputModule
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]

})
export class CategoryModule { }
