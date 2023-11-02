import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorsService implements ErrorHandler {

  constructor(private messageService: MessageService,private router: Router){}

  handleError(error: HttpErrorResponse) {
    if(error.status == 401){
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      setTimeout(() => {
       localStorage.clear();
       this.router.navigateByUrl('/login');
      }, 1000);

   }
  }

}
