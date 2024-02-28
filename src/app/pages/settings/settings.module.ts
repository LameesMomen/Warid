import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SettingTimeComponent } from './components/setting-time/setting-time.component';
import { VatComponent } from './components/vat/vat.component';
import { MoneyInfoComponent } from './components/money-info/money-info.component';





const routes : Routes =[
  {
    path : '',
    component : SettingsComponent
  },
//   {
//     path : 'search/:mobile',
//     component : SupplierComponent
//   },
//   {
//     path : 'viewPaymentDetail/:id',
//     component : PaymentOrderDetailsComponent
//   },
//   {
//     path : 'viewLocationDetail/:id',
//     component : LocationOrderDetailComponent
//   },
//   {
//     path : 'viewAssociationsDetail/:id',
//     component : AssociationOrderDetailComponent
//   },
]


@NgModule({
  declarations: [
    SettingsComponent,
    SettingTimeComponent,
    VatComponent,
    MoneyInfoComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
