import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CodeInputModule } from 'angular-code-input';
import CategoryComponent from './category.component';




const routes : Routes =[
  {
    path : '',
    component : CategoryComponent
  }
]

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CodeInputModule
  ]
})
export class CategoryModule { }
