import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//?imports files

import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import { TopbarComponent } from './topbar/topbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {DropdownModule} from 'primeng/dropdown';
import { SwiperModule } from 'swiper/angular';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CodeInputModule } from 'angular-code-input';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AccordionModule } from 'primeng/accordion';
import { RatingModule } from 'primeng/rating';





@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    TopbarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ToastModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MenubarModule,
    MenuModule,
    NgxPaginationModule,
    DropdownModule,
    SwiperModule,
    InputSwitchModule,
    CodeInputModule,
    DialogModule,
    AutoCompleteModule,
    AccordionModule,
    RatingModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCodeHidden:false,
      initialFocusField:0
    }),
  ],
  exports:[
    ToastModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MenubarModule,
    MenuModule,
    NgxPaginationModule,
    DropdownModule,
    SwiperModule,
    InputSwitchModule,
    CodeInputModule,
    DialogModule,
    AutoCompleteModule,
    RatingModule,
    AccordionModule,
  ],
})
export class SharedModule { }
