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
      localStorage.setItem('token',res.access);
      localStorage.setItem('refreshToken',res.refresh);
      localStorage.setItem('isLogin','logedin');
      this.route.navigateByUrl('/category')
      },
      err=>{
      this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'كلمة المرور او البريد الاكتروني غير صحيح'});
      }
    )
  }

  //? Submit Forget Password Data

  submitForgetPass(form:any){
    // this.spinner.show()
    let body :{'email' : string}={
      email: form.value.email,
    }

    // this.http.post('http://34.147.213.123/auth/admin-login/',body).subscribe(
    //   res=>{
    //   this.spinner.hide()
    //     this.router.navigate(['home'],{replaceUrl:true})
    //   },
    //   err=>{
    //   this.spinner.hide()
    //     this.messageService.add({severity:'error', summary:'خطأ', detail:'كلمة المرور اوالبريد الاكتروني غير صحيح'});
    //   }
    // )

    this.view='OTP'
    this.timer(180);
  }

  //? Submit OTP Data

  submitOTP(form:any){
    // this.spinner.show()
    let body :{'email' : string}={
      email: form.value.email,
    }

    // this.http.post('http://34.147.213.123/auth/admin-login/',body).subscribe(
    //   res=>{
    //   this.spinner.hide()
    //     this.router.navigate(['home'],{replaceUrl:true})
    //   },
    //   err=>{
    //   this.spinner.hide()
    //     this.messageService.add({severity:'error', summary:'خطأ', detail:'كلمة المرور اوالبريد الاكتروني غير صحيح'});
    //   }
    // )

    this.view='newPass'
  }

    //? Submit New Password Data
  submitNewPass(form:any){
    // this.spinner.show()
    let body :{'email' : string}={
      email: form.value.email,
    }

    // this.http.post('http://34.147.213.123/auth/admin-login/',body).subscribe(
    //   res=>{
    //   this.spinner.hide()
    //     this.router.navigate(['home'],{replaceUrl:true})
    //   },
    //   err=>{
    //   this.spinner.hide()
    //     this.messageService.add({severity:'error', summary:'خطأ', detail:'كلمة المرور اوالبريد الاكتروني غير صحيح'});
    //   }
    // )

    this.view='login'
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
