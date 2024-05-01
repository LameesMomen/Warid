import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boxes-view',
  templateUrl: './boxes-view.component.html',
  styleUrls: ['./boxes-view.component.css']
})
export class BoxesViewComponent {
  @Input() allProductList : any;
  page : number =1
}
