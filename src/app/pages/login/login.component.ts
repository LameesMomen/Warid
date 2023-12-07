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
  mobile:any
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
    this.mobile=form.value.number;

    this.http.get(`/auth/user-otp-request/?mobile=${this.mobile}`).subscribe(
      (res:any)=>{
      this.spinner.hide()
      localStorage.setItem('user_type',res.user_type);
      this.view='OTP'
      this.timer(180);
      },
      err=>{
      this.spinner.hide()
        this.messageService.add({severity:'error',  summary:'خطأ', detail:'رقم الجوال غير صحيح'});
      }
    )
  }


  //? Submit OTP Data

  onCodeCompleted(code : any){
    this.code = code
  }

  submitOTP(form:any){
    // this.spinner.show()
    let body :{'mobile' : string , 'otp' : any}={
      mobile: this.mobile,
      otp : this.code
    }

    this.http.post('/auth/user-login/',body).subscribe(
      (res:any)=>{
      this.spinner.hide()
      localStorage.setItem('token',res.access);
      localStorage.setItem('refreshToken',res.refresh);
      localStorage.setItem('isLogin','logedin');
      // this.route.navigateByUrl('/category')
      },
      err=>{
      this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'رمز التحقق غير صحيح'});
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
