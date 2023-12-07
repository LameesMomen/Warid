import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { ConfirmationService , MessageService } from 'primeng/api';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { RequestInterceptor } from './core/services/interceptor/request.interceptor';
import { HttpHelperService } from './core/services/http-helper/http-helper.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    ConfirmationService,
    MessageService,
    HttpHelperService,
    NgxSpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:RequestInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
