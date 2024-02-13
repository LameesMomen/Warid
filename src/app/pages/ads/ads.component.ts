import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit{

  allAds:any;

  constructor(private router : Router, private toasters : ToastersService,private http : HttpHelperService , private spinner : NgxSpinnerService,  private messageService:MessageService){}

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

  deleteAd(item:any){
    this.toasters.confirmationToaster({

      title: 'هل انت متأكد !',

      text: `هل تريد مسح ${item.name} ؟`,

      icon: 'question',

      confirmFunc: () => {

        this.spinner.show();
        this.http.deleteLocation(`/settings/ads/${item.id}/`).subscribe(
          res=>{
            this.spinner.hide();
            this.messageService.add({severity:'success',summary:'تم', detail:' تنفيذ العملية بنجاح'});
            setTimeout(() => {
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate(['ads']);
            });
            }, 500);
          },
          err=>{
            this.spinner.hide();
            this.messageService.add({severity:'error',summary:'خطأ', detail:'حدث خطأ ما'});
          }
        )
      

      },

      onDismiss: () => {
        
      }

    })
  }
}
