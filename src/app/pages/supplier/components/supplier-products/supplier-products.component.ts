import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.css']
})
export class SupplierProductsComponent implements OnInit{

 @Input() id:any
 data:any
constructor(private http : HttpHelperService,private spinner : NgxSpinnerService, private messageService : MessageService , private router : Router){
}

ngOnInit(): void {
  this.getData()
}

getData(){
  this.spinner.show();
  this.http.get(`/productmanager/admin/supplier-products/?supplier_id=${this.id}`).subscribe(
    (res:any)=>{
      this.data = res;
      console.log(this.data)
      this.spinner.hide();
    },
    err  =>{
      this.spinner.hide();
      this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
    }
  )
}
}
