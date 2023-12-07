import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientComponent } from './client.component';



const routes : Routes =[
  {
    path : '',
    component : ClientComponent
  }
]

@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ]
})
export class ClientModule { }
