import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-supplier-commision',
  templateUrl: './supplier-commision.component.html',
  styleUrls: ['./supplier-commision.component.css']
})
export class SupplierCommisionComponent implements OnInit {

  id:any
  response:any
  page:number =1
  constructor(private http : HttpHelperService,private spinner : NgxSpinnerService, private messageService : MessageService , private router : Router,private route : ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.spinner.show();
    this.http.get(`/financemanager/admin-commissions/?supplier_id=${this.id}`).subscribe(
      (res:any)=>{
        this.response=res.data;
        this.spinner.hide();
      },
      err  =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }
}
