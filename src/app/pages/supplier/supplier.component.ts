import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit{

  AllsuppliersData:any
  filtersuppliers:any
  active:boolean = false
  page:number = 1

  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService , private messageService : MessageService,private toasters : ToastersService,private  router : Router){}
  ngOnInit(): void {
   this.getsuppliersData()
  }

  RadioFilter(value:any){
    this.active = true
    if(value == 'active'){
      this.filtersuppliers = this.AllsuppliersData.filter((item:any) => item.is_approved);
    }
    else{
      this.filtersuppliers = this.AllsuppliersData.filter((item:any) => !item.is_approved);
    }
  }

  getsuppliersData(){
    this.spinner.show();
    this.http.get('/auth/admin/supplier/list/').subscribe(
      (res:any)=>{
        this.AllsuppliersData=res;
        this.spinner.hide();
      },
      err  =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  change_is_approved(item:any){
    if(item.is_approved){
      this.toasters.confirmationToaster({
        title: 'هل انت متأكد !',
  
        text: `هل تريد تعليق ${item.first_name} ${item.last_name} ؟`,
  
        icon: 'question',
  
        confirmFunc: () => {
          let payload: any = { ...item };
  
          payload.is_approved = !item.is_approved;
  
          this.showBannerAPI(payload);
        },
  
        onDismiss: () => {
  
        },
      });
    }
    else{
      this.toasters.confirmationToaster({
        title: 'هل انت متأكد !',
  
        text: `هل تريد تفعيل ${item.first_name} ${item.last_name} ؟`,
  
        icon: 'question',
  
        confirmFunc: () => {
          let payload: any = { ...item };
  
          payload.is_approved = !item.is_approved;
  
          this.showBannerAPI(payload);
        },
  
        onDismiss: () => {
  
        },
      });
    }


}

showBannerAPI(body: any) {
  this.http
    .put(`/auth/admin/supplier/edit/${body.id}`, {
      is_approved: body.is_approved,
    })
    .subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم',
          detail: ' تنفيذ العملية بنجاح',
        });
        setTimeout(() => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['supplier']);
        });
        }, 500);
        this.spinner.hide();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'حدث خطأ ما',
        });
        this.spinner.hide();
      }
    );
}
}
