import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{

  orderData:any
  id:any

  constructor(private http:HttpHelperService,private messageService : MessageService , private  spinner:NgxSpinnerService , private route:ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id')
  }
  
  ngOnInit(): void {
    this.getOrderDetail()
  }

  getOrderDetail(){
    this.spinner.show();
    this.http.get(`/ordermanager/client/orders/${this.id}/`).subscribe(
      (res:any)=>{
        this.orderData=res;
        this.spinner.hide();
      },
      err  =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

}
