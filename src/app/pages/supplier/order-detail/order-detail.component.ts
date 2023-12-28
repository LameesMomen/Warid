import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  orderData: any;
  id: any;
  ratingValue: any;
  timePercent: any;
  visible: boolean = false;

  constructor(
    private http: HttpHelperService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toasters: ToastersService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  showDialog() {
    this.visible = true;
  }

  ngOnInit(): void {
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.spinner.show();
    this.http.get(`/ordermanager/supplier/orders/${this.id}/`).subscribe(
      (res: any) => {
        this.orderData = res;
        this.spinner.hide();
        this.timer(res.cancel_time);
      },
      (err) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'حدث خطأ ما',
        });
      }
    );
  }

  handleClientPayment() {
    this.toasters.confirmationToaster({
      title: 'تأكيد أستلام الدفع',

      text: `هل أنت متأكد من أستلام الدفع من العميل؟`,

      icon: '',

      confirmFunc: () => {
        let payload: any = {
          action: 'confirm',
        };

        this.submitClientPayment(payload);
      },

      onDismiss: () => {},
    });
  }

  submitClientPayment(body: any) {
    this.http.put(`/ordermanager/supplier/orders/${this.id}/`, body).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم',
          detail: ' تنفيذ العملية بنجاح',
        });
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

  handleArrivedOrder() {
    this.toasters.confirmationToaster({
      title: 'تأكيد التوصيل',

      text: `هل أنت متأكد من توصيل الطلب إلى العميل؟`,

      icon: '',

      confirmFunc: () => {
        let payload: any = {
          action: 'deliver',
        };

        this.submitArrivedOrder(payload);
      },

      onDismiss: () => {},
    });
  }

  submitArrivedOrder(body: any) {
    this.http.put(`/ordermanager/supplier/orders/${this.id}/`, body).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم',
          detail: ' تنفيذ العملية بنجاح',
        });
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

  //?CountDown Timer

  timerOn: boolean = true;
  remainigTime: any;

  timer(remaining: any) {
    this.remainigTime = new Date(remaining * 1000).toISOString().slice(11, 19);

    remaining -= 1;

    if (remaining >= 0 && this.timerOn) {
      setTimeout(() => {
        this.timer(remaining);
      }, 1000);
      return;
    }

    if (!this.timerOn) {
      // Do validate stuff here
      return;
    }
  }

  // arrivedRemainigTime: any;
  // cancelledRemainigTime: any;

  // arrivedTimer(remaining: any) {
  //   // Update the count down every 1 second
  //   var x = setInterval(() => {
  //     let countDownDate = new Date(remaining).getTime();

  //     // Get today's date and time
  //     var now = new Date().getTime();

  //     // Find the distance between now and the count down date
  //     let distance = countDownDate - now;

  //     var remainingdays = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     var remaininghours = Math.floor(
  //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     var remainingminutes = Math.floor(
  //       (distance % (1000 * 60 * 60)) / (1000 * 60)
  //     );
  //     var remainingseconds = Math.floor((distance % (1000 * 60)) / 1000);

  //     this.arrivedRemainigTime =
  //       remainingdays +
  //       ':' +
  //       remaininghours +
  //       ':' +
  //       remainingminutes +
  //       ':' +
  //       remainingseconds;

  //     // If the count down is over, write some text
  //     if (distance < 0) {
  //       clearInterval(x);
  //       this.arrivedRemainigTime = 'END';
  //     }
  //   }, 1000);
  // }

  // cancelledTimer(remaining: any) {
  //   // Update the count down every 1 second
  //   var x = setInterval(() => {
  //     let countDownDate = new Date(remaining).getTime();

  //     // Get today's date and time
  //     var now = new Date().getTime();

  //     // Find the distance between now and the count down date
  //     let distance = countDownDate - now;

  //     var remainingdays = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     var remaininghours = Math.floor(
  //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     var remainingminutes = Math.floor(
  //       (distance % (1000 * 60 * 60)) / (1000 * 60)
  //     );
  //     var remainingseconds = Math.floor((distance % (1000 * 60)) / 1000);

  //     this.cancelledRemainigTime =
  //       remainingdays +
  //       ':' +
  //       remaininghours +
  //       ':' +
  //       remainingminutes +
  //       ':' +
  //       remainingseconds;

  //     // If the count down is over, write some text
  //     if (distance < 0) {
  //       clearInterval(x);
  //       this.cancelledRemainigTime = 'END';
  //     }
  //   }, 1000);
  // }
}
