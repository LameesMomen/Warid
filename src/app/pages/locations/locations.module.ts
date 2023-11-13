import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationsComponent } from './locations.component';
import { AddLocationComponent } from './components/add-location/add-location.component';



const routes : Routes =[
  {
    path : '',
    component : LocationsComponent
  },
  {
    path : 'addLocation',
    component : AddLocationComponent
  }
]

@NgModule({
  declarations: [
    LocationsComponent,
    AddLocationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ]
})
export class LocationsModule { }
