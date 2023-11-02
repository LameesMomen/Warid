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

  constructor(private http : HttpHelperService,private router :Router,private messageService:MessageService , private spinner : NgxSpinnerService){}

  ngOnInit(): void {
    this.setView('login')
  }

  setView(value:string){
    this.view=value
  }

  
  submit(form:any){
    this.spinner.show()
    let body :{'email' : string , 'password' :any}={
      email: form.value.email,
      password: form.value.password
    }

    this.http.post('http://34.147.213.123/auth/admin-login/',body).subscribe(
      res=>{
      this.spinner.hide()
        this.router.navigate(['home'],{replaceUrl:true})
      },
      err=>{
      this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'كلمة المرور اوالبريد الاكتروني غير صحيح'});
      }
    )
  }


  submitForgetPass(form:any){
    this.spinner.show()
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
  }

}
