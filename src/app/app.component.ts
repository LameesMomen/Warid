import { Component, OnInit } from '@angular/core';
import { HttpHelperService } from './core/services/http-helper/http-helper.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private http : HttpHelperService ,private router : Router , private messageService : MessageService){}

  ngOnInit(): void {
    // if(sessionStorage.getItem('refreshToken')){
    //   this.refreshToken();
    // }
  }


  // refreshToken(){
  //   setInterval(() => {
  //     this.http.post('/auth/token/refresh/',{refresh : sessionStorage.getItem('refreshToken')}).subscribe(
  //       (res:any)=>{
  //         sessionStorage.setItem('token',res.access);
  //       },
  //       err =>{
  //           setTimeout(() => {
  //           sessionStorage.clear();
  //           this.router.navigateByUrl('/login');
  //           }, 1000);
  //       }
  //     )
  //   }, 60000);
  // }

}
