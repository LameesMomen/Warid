import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.css']
})
export class AddAdsComponent {
  adsImage :any
  imageFile :any
  patternLink : string ='(https?:\/\/.*\.)';


  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService , private messageService : MessageService ,  private router : Router){}

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

    body.append('image', this.imageFile);
    body.append('name', form.value.name);
    body.append('link', form.value.link);

    this.http.post('/settings/ads/',body).subscribe(
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
