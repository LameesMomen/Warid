import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-supplier-reviews',
  templateUrl: './supplier-reviews.component.html',
  styleUrls: ['./supplier-reviews.component.css']
})
export class SupplierReviewsComponent implements OnInit{
@Output() totalReviews = new EventEmitter<number>();
ratingValue:number=5
regex = /(?<!^).(?!$)/g;
w = 'لميس'

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
  this.http.get(`/ordermanager/supplier-reviews/?supplier_id=${this.id}`).subscribe(
    (res:any)=>{
      this.response=res.reviews;
      this.totalReviews.emit(res.rating)
      this.spinner.hide();
    },
    err  =>{
      this.spinner.hide();
      this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
    }
  )
}
}
