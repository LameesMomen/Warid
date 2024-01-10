import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  allData:any;
  page:any = 1

  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService , private  messageService : MessageService){}

  
  ngOnInit(): void {
    this.getOrders()
  }



  getOrders(){
    this.spinner.show()
    this.http.get('/ordermanager/admin/orders/').subscribe(
      (res:any)=>{
        this.spinner.hide();
        this.allData=res.active;
      },
      err =>{
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }
}

