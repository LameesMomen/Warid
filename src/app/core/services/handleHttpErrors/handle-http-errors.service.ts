import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { HttpHelperService } from '../http-helper/http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorsService implements ErrorHandler {

  constructor(private messageService: MessageService,private router: Router , private http : HttpHelperService){}

  handleError(error: HttpErrorResponse) {
    if(error.status == 401){
      this.http.post('/auth/token/refresh/',{refresh : sessionStorage.getItem('refreshToken')}).subscribe(
        (res:any)=>{
          sessionStorage.setItem('token',res.access);
          window.location.reload()
        },
        err =>{
            this.messageService.add({severity:'error', detail:'session expired'});
            setTimeout(() => {
            sessionStorage.clear();
            this.router.navigateByUrl('/login');
            }, 1000);
        }
      )

   }
  }

}
