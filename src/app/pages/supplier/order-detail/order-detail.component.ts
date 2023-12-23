import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit{

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
    this.http.get(`/ordermanager/supplier/orders/${this.id}/`).subscribe(
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
