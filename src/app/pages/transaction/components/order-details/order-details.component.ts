import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input() response :any;
  visible: boolean = false;


  showDialog() {
    this.visible = true;
  }
}
