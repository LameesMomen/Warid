import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdsComponent } from './ads.component';
import { AddAdsComponent } from './components/add-ads/add-ads.component';



const routes : Routes =[
  {
    path : '',
    component : AdsComponent
  },
  {
    path : 'add-ads',
    component : AddAdsComponent
  },
//   {
//     path : 'search/:mobile',
//     component : ClientComponent
//   },
//   {
//     path : 'addClient',
//     component : AddClientComponent
//   },
//   {
//     path : 'ads/:id',
//     component : OrdersComponent
//   },
]

@NgModule({
  declarations: [
    AdsComponent,
    AddAdsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]

})
export class AdsModule { }
