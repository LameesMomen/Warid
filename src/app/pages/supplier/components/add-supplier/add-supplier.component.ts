import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent {

  productImage :any='assets/profilePlaceholder.png'
  imageFile :any

  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService , private messageService : MessageService ,  private router : Router){}

  changeImage(event: any) {
    this.imageFile = event.target.files[0];
    this.productImage = this.imageFile ? URL.createObjectURL(this.imageFile) : 'assets/profilePlaceholder.png';
  }

  submit(form:any){
    this.spinner.show();

    const body = new FormData();

    body.append('first_name', form.value.first_name);
    body.append('last_name', form.value.last_name);
    body.append('mobile', form.value.mobile);
    body.append('avatar', this.imageFile);
    body.append('city', form.value.city);
    body.append('neighborhood', form.value.neighborhood);
    body.append('street', form.value.street);
    body.append('comm_reg_number', form.value.comm_reg_number);
    body.append('vat_number', form.value.vat_number);

    this.http.post('/auth/register-supplier/',body).subscribe(
      res=>{
        this.spinner.hide();
        this.messageService.add({severity:'success',summary:'تم', detail:' تنفيذ العملية بنجاح'});
        setTimeout(() => {
          this.router.navigateByUrl('/supplier')
        }, 500);
      },
      err=>{
        this.messageService.add({severity:'error',summary:'خطأ', detail:err.error.detail});
        this.spinner.hide();
      }
    )
  }
}
