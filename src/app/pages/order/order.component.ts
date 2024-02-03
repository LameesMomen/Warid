import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  allAssociations:any
  allLocations:any
  allPayments:any
  radioValue:string ='payment';

  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService , private  messageService : MessageService){}


  ngOnInit(): void {
    this.getOrdersLocation()
    this.getOrdersPayment()
    this.getAssociations()
  }



  getOrdersLocation(){
    this.spinner.show()
    this.http.get('/locationmanager/admin/locations/requests/').subscribe(
      (res:any)=>{
        this.spinner.hide();
        this.allLocations=res;
      },
      err =>{
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  getOrdersPayment(){
    this.spinner.show()
    this.http.get('/financemanager/admin/supplier-payments/').subscribe(
      (res:any)=>{
        this.spinner.hide();
        this.allPayments=res;
      },
      err =>{
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  getAssociations(){
    this.spinner.show()
    this.http.get('/locationmanager/admin/associations/requests/').subscribe(
      (res:any)=>{
        this.spinner.hide();
        this.allLocations=res;
      },
      err =>{
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }
}
