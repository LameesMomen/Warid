import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CodeInputModule } from 'angular-code-input';



const routes : Routes =[
  {
    path : '',
    component : LoginComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CodeInputModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCodeHidden:false,
      initialFocusField:0
    }),
  ]
})
export class LoginModule { }
