import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input() response :any;
  @Input() rating : any;
  visibleDelieveryImage: boolean = false;
  visiblePaymentImage: boolean = false;
  regex = /(?<!^).(?!$)/g;

  constructor(){}
  showDialogDelievery() {
    this.visibleDelieveryImage = true;
  }
  showDialogPayment() {
    this.visiblePaymentImage = true;
  }
}
