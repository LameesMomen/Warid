import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CodeInputModule } from 'angular-code-input';
import CategoryComponent from './category.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { AddSubcategoryComponent } from './components/add-subcategory/add-subcategory.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';


import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { EditSubcategoryComponent } from './components/edit-subcategory/edit-subcategory.component';



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
    AddCategoryComponent,
    EditCategoryComponent,
    EditSubcategoryComponent
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
