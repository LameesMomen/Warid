import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-association-orders',
  templateUrl: './association-orders.component.html',
  styleUrls: ['./association-orders.component.css']
})
export class AssociationOrdersComponent {
@Input() allAssociations:any
page: number = 1;

constructor(
  private http: HttpHelperService,
  private spinner: NgxSpinnerService,
  private messageService: MessageService,
  private toasters: ToastersService
) { 
  console.log(this.allAssociations)
}


apprroved(item: any) {
  this.toasters.confirmationToaster({
    title: 'هل انت متأكد !',

    text: `هل تريد تنفيذ طلب ${item.id} ؟`,

    icon: 'question',

    confirmFunc: () => {
      let payload: any = { ...item };

      this.showBannerAPI(payload);
    },

    onDismiss: () => { },
  });
}

delete(item: any) {
  this.toasters.confirmationToaster({
    title: 'هل انت متأكد !',

    text: `هل تريد مسح ${item.id} ؟`,

    icon: 'question',

    confirmFunc: () => {
      let payload: any = { ...item };
      payload.client_mobile=payload.owner.mobile;
      this.http
        .deleteLocation(`/locationmanager/admin/associations/${item.id}`)
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'تم',
              detail: ' تنفيذ العملية بنجاح',
            });
            setTimeout(() => {
              location.reload();
            }, 10);
            this.spinner.hide();
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: 'حدث خطأ ما',
            });
            this.spinner.hide();
          }
        );
    },

    onDismiss: () => { },
  });
}

showBannerAPI(body: any) {
  this.http
    .put(`/locationmanager/admin/associations/approve/${body.id}`, {
      id: body.id,
    })
    .subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم',
          detail: ' تنفيذ العملية بنجاح',
        });
        setTimeout(() => {
          location.reload();
        }, 10);
        this.spinner.hide();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'حدث خطأ ما',
        });
        this.spinner.hide();
      }
    );
}
}
