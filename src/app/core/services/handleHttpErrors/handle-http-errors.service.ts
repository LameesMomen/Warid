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
      this.http.post('auth/token/refresh/',{refresh : localStorage.getItem('refreshToken')}).subscribe(
        (res:any)=>{
          localStorage.setItem('token',res.access);
          location.reload()
        },
        err =>{
            this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
            setTimeout(() => {
            localStorage.clear();
            this.router.navigateByUrl('/login');
            }, 1000);
        }
      )

   }
  }

}
