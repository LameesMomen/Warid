import { NgPlural } from '@angular/common';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ToastersService {

  constructor(
    private messageService: MessageService,
    private toastr: ToastrService
  ) { }

  dispalyToaster(severity: string, summary: string, details: string) {
    this.messageService.add({  
      severity:severity, 
      summary:summary, 
      detail:details
    });
  }


  errorToast(err: any, statusCode: string) {
    this.toastr.error(err, statusCode, {progressBar: true})
  }
  
  confirmationToaster(options: ConfirmationToasterOptions) {
    Swal.fire({
      title: options.title,
      text: options.text,
      icon: options.icon,
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      showCancelButton: true,
      showConfirmButton: true,
    }).then((e) => {
      
      if (e.value) {
        options.confirmFunc!()
      } else {
        options.onDismiss!()
      }

    })
  
  }


}

class ConfirmationToasterOptions {
  title?: string;  
  text?: string;  
  icon?: any;
  
  confirmFunc?(): void;
  onDismiss?(): void;
}