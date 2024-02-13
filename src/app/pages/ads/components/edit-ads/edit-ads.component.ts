import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-edit-ads',
  templateUrl: './edit-ads.component.html',
  styleUrls: ['./edit-ads.component.css']
})
export class EditAdsComponent implements OnInit {
  id:any
  ad:any
  adsImage :any
  imageFile :any
  patternLink : string ='(https?:\/\/.*\.)';


  constructor(private route:ActivatedRoute,private http : HttpHelperService , private spinner : NgxSpinnerService , private messageService : MessageService ,  private router : Router){
    this.id = route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.spinner.show()
    this.http.get(`/settings/ads/${this.id}/`).subscribe(
      (res:any)=>{
        this.ad=res;
        this.spinner.hide()
      },
      err =>{
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

   dragOverHandler(ev:any) {
    ev.preventDefault();
  }

  changeImage(event: any) {
    event.preventDefault();
    this.imageFile = event.target.files[0];
    this.adsImage = this.imageFile ? URL.createObjectURL(this.imageFile) : '';
  }

  submit(form:any){
    this.spinner.show();

    const body = new FormData();
    this.imageFile ? body.append('image', this.imageFile):'';
    // body.append('image', this.imageFile?this.imageFile:this.ad.image);
    body.append('name', this.ad.name);
    body.append('link', this.ad.link);

    this.http.put(`/settings/ads/${this.id}/`,body).subscribe(
      res=>{
        this.spinner.hide();
        this.messageService.add({severity:'success',summary:'تم', detail:' تنفيذ العملية بنجاح'});
        setTimeout(() => {
          this.router.navigateByUrl('/ads')
        }, 500);
      },
      err=>{
        this.messageService.add({severity:'error',summary:'خطأ', detail:'حدث خطأ ما'});
        this.spinner.hide();
      }
    )
  }
}
