import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.css']
})
export class PaymentOrderComponent {
  @Input() public allPaymentOrders: any;
  page: number = 1;

  constructor(
    private http: HttpHelperService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private toasters: ToastersService
  ) { }


  apprroved(item: any) {
    this.toasters.confirmationToaster({
      title: 'هل انت متأكد !',

      text: `هل تريد تنفيذ طلب ${item.id} ؟`,

      icon: 'question',

      confirmFunc: () => {
        let payload: any = { ...item };
        payload.is_approved = true
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
        payload.is_approved = false
        this.http
        .put(`/financemanager/admin/supplier-payments/${item.id}/`, {
          amount: item.amount,
          is_approved: item.is_approved
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
      },

      onDismiss: () => { },
    });
  }

  showBannerAPI(body: any) {
    this.http
    .put(`/financemanager/admin/supplier-payments/${body.id}/`, {
      amount: body.amount,
      is_approved: body.is_approved
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
