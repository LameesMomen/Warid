import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-view-supplier-info',
  templateUrl: './view-supplier-info.component.html',
  styleUrls: ['./view-supplier-info.component.css']
})
export class ViewSupplierInfoComponent implements OnInit{

  id:any
  radioValue: string ='personal';
  editMode : boolean =false;
  supplierDetail : any
  productImage :any
  imageFile :any

  constructor(private http : HttpHelperService,private spinner : NgxSpinnerService, private messageService : MessageService , private router : Router,private route : ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.spinner.show();
    this.http.get(`/auth/admin/supplier/list/${this.id}`).subscribe(
      (res:any)=>{
        this.supplierDetail=res;
        this.productImage = this.supplierDetail?.avatar ? this.supplierDetail?.avatar :'assets/profilePlaceholder.png'

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
    this.productImage = this.imageFile ? URL.createObjectURL(this.imageFile) : this.supplierDetail?.avatar;
  }

  submit(form:any){
    this.spinner.show();

    const body = new FormData();

    body.append('first_name', form.first_name);
    body.append('last_name', form.last_name);
    body.append('avatar', this.imageFile ? this.imageFile : this.supplierDetail?.avatar);
    body.append('city', form.city);
    body.append('neighborhood', form.neighborhood);
    body.append('street', form.street);
    body.append('comm_reg_number', form.comm_reg_number);
    body.append('vat_number', form.vat_number);


    this.http.put(`/auth/admin/supplier/edit/${form.id}`,body).subscribe(
      res=>{
        this.spinner.hide();
        this.messageService.add({severity:'success',summary:'تم', detail:' تنفيذ العملية بنجاح'});
        setTimeout(() => {
          this.editMode = ! this.editMode
          this.ngOnInit();
        }, 500);
      },
      err=>{
        this.spinner.hide();
        this.messageService.add({severity:'error',summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }
}
