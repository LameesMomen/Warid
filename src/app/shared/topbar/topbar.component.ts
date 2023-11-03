import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements  OnInit {

  userName:string=''
  show:boolean = false

  constructor(private http : HttpHelperService , private messageService : MessageService   , private route : Router){}


  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.http.get('/auth/user/').subscribe(
      (res:any)=>{
        this.userName = res.username
      },
      err =>{
        this.messageService.add({severity:'error', summary:'خطأ', detail:'كلمة المرور او البريد الاكتروني غير صحيح'});
      }
    )
  }

  logOut(){
      localStorage.clear();
       this.route.navigateByUrl('/login');
  }

}
