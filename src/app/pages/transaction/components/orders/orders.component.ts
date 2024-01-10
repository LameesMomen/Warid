import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  setView:string= 'orders';
  id:any
  response:any
  visible: boolean = false;


  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService , private  messageService : MessageService,private route : ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id')
  }

  
  ngOnInit(): void {
    this.getOrders()
  }



  getOrders(){
    this.spinner.show()
    this.http.get(`/ordermanager/admin/orders/${this.id}/`).subscribe(
      (res:any)=>{
        this.spinner.hide();
        this.response=res;
      },
      err =>{
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  changeView(value:string){
    this.setView = value
  }

  showDialog() {
    this.visible = true;
  }
}
