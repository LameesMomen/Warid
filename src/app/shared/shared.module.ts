import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//?imports files

import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports:[
    ToastModule
  ]
})
export class SharedModule { }
