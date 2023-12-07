import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  show:boolean = false

  constructor(private http : HttpHelperService , private messageService : MessageService   , public route : Router){}

  logOut(){
    this.http.post('/auth/logout/',{refresh:localStorage.getItem('refreshToken')}).subscribe(
      res =>{
        localStorage.clear();
        this.route.navigateByUrl('/login');
      },
      err=>{
        this.messageService.add({severity:'error', summary:'خطأ', detail:'كلمة المرور او البريد الاكتروني غير صحيح'});
      }
    )
  }

}
