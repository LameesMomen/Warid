import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  view : string=''
  email:any
  code:any

  constructor(private http : HttpHelperService,private router :Router,private messageService:MessageService , private spinner : NgxSpinnerService ,  private route : Router){}

  ngOnInit(): void {
    this.setView('login')
  }

  setView(value:string){
    this.view=value
  }

  
  //? Submit Login Data

  submitLogin(form:any){
    this.spinner.show()
    let body :{'email' : string , 'password' :any}={
      email: form.value.email,
      password: form.value.password
    }

    this.http.post('/auth/admin-login/',body).subscribe(
      (res:any)=>{
      this.spinner.hide()
      sessionStorage.setItem('token',res.access);
      sessionStorage.setItem('refreshToken',res.refresh);
      sessionStorage.setItem('isLogin','logedin');
      this.route.navigateByUrl('/ads')
      },
      err=>{
      this.spinner.hide()
        this.messageService.add({severity:'error',  summary:'خطأ', detail:'كلمة المرور او البريد الاكتروني غير صحيح'});
      }
    )
  }

  //? Submit Forget Password Data

  submitForgetPass(form:any){
    this.spinner.show()
    this.email = form.value.email
    let body :{'email' : string}={
      email: form.value.email,
    }

    this.http.post('/auth/password/reset/',body).subscribe(
      res=>{
      this.spinner.hide()
          this.view='OTP'
          this.timer(180);
      },
      err=>{
      this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'البريد الاكتروني الخاص بك غير صحيح'});
      }
    )
  }

  //? Submit OTP Data

  onCodeCompleted(code : any){
    this.code = code
  }

  submitOTP(form:any){
    // this.spinner.show()
    let body :{'email' : string , 'otp' : any}={
      email: this.email,
      otp : this.code
    }

    this.http.post('/auth/password/reset/confirm-step-1/',body).subscribe(
      res=>{
      this.spinner.hide()
          this.view='newPass'
      },
      err=>{
      this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'رمز التحقق غير صحيح'});
      }
    )

  }

    //? Submit New Password Data
  submitNewPass(form:any){
    // this.spinner.show()
    let body :{'email' : string ,'new_password1' : any , 'new_password2' : any}={
      email: this.email,
      new_password1: form.value.newPass,
      new_password2: form.value.confirmPass
    }

    this.http.post('/auth/password/reset/confirm-step-2/',body).subscribe(
      res=>{
      this.spinner.hide()
      this.messageService.add({severity:'succes', summary:'تم', detail:'تم تغير كلمة المرور بنجاح'});

      setTimeout(() => {
        this.view='login'
      }, 500);
      },
      err=>{
      this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }



  //?CountDown Timer

  timerOn : boolean = true;
  remainigTime : any

 timer(remaining:any) {
  var m :any = Math.floor(remaining / 60);
  var s :any = remaining % 60;
  
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  this.remainigTime = m + ':' + s;
  remaining -= 1;
  
  if(remaining >= 0 && this.timerOn) {
    setTimeout(() => {
        this.timer(remaining);
    }, 1000);
    return;
  }

  if(!this.timerOn) {
    // Do validate stuff here
    return;
  }
}


}
