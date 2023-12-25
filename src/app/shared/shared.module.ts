import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//?imports files

import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home/home.component';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import { NgxPaginationModule } from 'ngx-pagination';
import {DropdownModule} from 'primeng/dropdown';
import { SwiperModule } from 'swiper/angular';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CodeInputModule } from 'angular-code-input';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RatingModule } from 'primeng/rating';




@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FooterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ToastModule,
    RatingModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      subtitle : "ثانية ، دقيقة ، ساعة , يوم",
      showSubtitle : true,
      animation:false,
      titleFontSize:"28",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "lazy": true
    }),
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
    CodeInputModule.forRoot({
      codeLength: 6,
      isCodeHidden:false,
      initialFocusField:0
    }),
  ],
  exports:[
    ToastModule,
    InputTextModule,
    RatingModule,
    NgCircleProgressModule,
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
  ],
})
export class SharedModule { }
