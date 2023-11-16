import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-view-personal-info',
  templateUrl: './view-personal-info.component.html',
  styleUrls: ['./view-personal-info.component.css']
})
export class ViewPersonalInfoComponent implements OnInit{

  id:any
  radioValue: string ='personal';
  editMode : boolean =false;
  clientDetail : any
  productImage :any='assets/profilePlaceholder.png'
  imageFile :any

  constructor(private http : HttpHelperService,private spinner : NgxSpinnerService, private messageService : MessageService , private router : Router,private route : ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.spinner.show();
    this.http.get(`/auth/admin/client/list/${this.id}`).subscribe(
      (res:any)=>{
        this.clientDetail=res;
        this.spinner.hide();
      },
      err  =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  changeImage(event: any) {
    this.imageFile = event.target.files[0];
    this.productImage = this.imageFile ? URL.createObjectURL(this.imageFile) : this.clientDetail?.avatar;
  }

  submit(form:any){
    this.spinner.show();

    const body = new FormData();

    body.append('first_name', form.first_name);
    body.append('last_name', form.last_name);
    body.append('avatar', form.avatr ? form.avatar : this.imageFile);
    body.append('city', form.city);
    body.append('neighborhood', form.neighborhood);
    body.append('street', form.street);
    body.append('postal_code', form.postal_code);
    body.append('mailbox', form.mailbox);


    this.http.put(`/auth/admin/client/edit/${form.id}`,body).subscribe(
      res=>{
        this.spinner.hide();
        this.messageService.add({severity:'success',summary:'تم', detail:' تنفيذ العملية بنجاح'});
        setTimeout(() => {
          this.editMode = ! this.editMode
        }, 500);
      },
      err=>{
        this.spinner.hide();
        this.messageService.add({severity:'error',summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }
}
