import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderData: any;
  id: any;
  ratingValue: any;
  timePercent: any;
  visible: boolean = false;

  constructor(
    private http: HttpHelperService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
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
    this.http.get(`/ordermanager/client/orders/${this.id}/`).subscribe(
      (res: any) => {
        this.orderData = res;
        this.spinner.hide();
        this.arrivedTimer('2023-12-30T22:00:00');
        this.cancelledTimer('2023-12-25T22:00:00');
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

  //?CountDown Timer
  arrivedRemainigTime: any;
  cancelledRemainigTime: any;

  arrivedTimer(remaining: any) {
    // Update the count down every 1 second
    var x = setInterval(() => {
      let countDownDate = new Date(remaining).getTime();

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      var remainingdays = Math.floor(distance / (1000 * 60 * 60 * 24));
      var remaininghours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var remainingminutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      var remainingseconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.arrivedRemainigTime =
        remainingdays +
        ':' +
        remaininghours +
        ':' +
        remainingminutes +
        ':' +
        remainingseconds;

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        this.arrivedRemainigTime = 'END';
      }
    }, 1000);
  }

  cancelledTimer(remaining: any) {
    // Update the count down every 1 second
    var x = setInterval(() => {
      let countDownDate = new Date(remaining).getTime();

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      var remainingdays = Math.floor(distance / (1000 * 60 * 60 * 24));
      var remaininghours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var remainingminutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      var remainingseconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.cancelledRemainigTime =
        remainingdays +
        ':' +
        remaininghours +
        ':' +
        remainingminutes +
        ':' +
        remainingseconds;

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        this.cancelledRemainigTime = 'END';
      }
    }, 1000);
  }
}
