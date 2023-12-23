import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  show:boolean = false
  userName:string=''

  constructor(private http : HttpHelperService , private messageService : MessageService   , public route : Router){}

  ngOnInit(): void {
    let user:any = sessionStorage.getItem('user')
    user = JSON.parse(user)
    this.userName=user.first_name +' '+ user.last_name
    console.log(this.userName)
  }

  logOut(){
    this.http.post('/auth/logout/',{refresh:sessionStorage.getItem('refreshToken')}).subscribe(
      res =>{
        sessionStorage.clear();
        this.route.navigateByUrl('/login');
      },
      err=>{
        this.messageService.add({severity:'error', summary:'خطأ', detail:'كلمة المرور او البريد الاكتروني غير صحيح'});
      }
    )
  }

}
