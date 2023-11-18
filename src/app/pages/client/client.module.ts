import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientComponent } from './client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ViewPersonalInfoComponent } from './components/view-personal-info/view-personal-info.component';
import { LocationsComponent } from './components/locations/locations.component';



const routes : Routes =[
  {
    path : '',
    component : ClientComponent
  },
  {
    path : 'search/:mobile',
    component : ClientComponent
  },
  {
    path : 'addClient',
    component : AddClientComponent
  },
  {
    path : 'viewClient/:id',
    component : ViewPersonalInfoComponent
  },
]

@NgModule({
  declarations: [
    ClientComponent,
    AddClientComponent,
    ViewPersonalInfoComponent,
    LocationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]

})
export class ClientModule { }
