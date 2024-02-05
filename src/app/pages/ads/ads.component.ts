import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit{

  allAds:any;

  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService,  private messageService:MessageService){}

  ngOnInit(): void {
    this.spinner.show()
    this.http.get('/settings/ads/').subscribe(
      (res:any)=>{
        this.allAds=res;
        this.spinner.hide()
      },
      err =>{
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }
}
