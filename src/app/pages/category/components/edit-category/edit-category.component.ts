import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit{

  @Input() public id :any;
  @Output() view = new EventEmitter<string>();


  title:any;
  unit_type:any
  commission:any
  is_active:any

  constructor(private http : HttpHelperService , private spinner: NgxSpinnerService , private messageService : MessageService,private toasters : ToastersService){}

  ngOnInit(): void {
    this.getCategoryById()
  }

  ngOnChanges(changes:any) {
    this.getCategoryById()
  }

  getCategoryById(){
    this.spinner.show()
    this.http.get(`/productmanager/admin/categories/${this.id}`).subscribe(
      (res:any)=>{
        this.title=res.title;
        this.unit_type=res.unit_type;
        this.commission=res.commission;
        this.is_active=res.is_active;
        this.spinner.hide()
      },
      err=>{
        this.messageService.add({severity:'error',summary:'خطأ', detail:'حدث خطأ ما'});
        this.spinner.hide()
      }
    )
  }

  submit(form:any){
    this.spinner.show();
    let body :{'title' :  string , 'unit_type' : string , 'commission' : any}={
      title: this.title,
      unit_type: this.unit_type,
      commission: this.commission,
    }

    this.http.put(`/productmanager/admin/categories/${this.id}/`,body).subscribe(
      res=>{
        this.messageService.add({severity:'success',summary:'تم', detail:' تنفيذ العملية بنجاح'});
        setTimeout(() => {
          this.view.emit('show SubCategory')
        }, 500);
        this.spinner.hide();
      },
      err=>{
        this.messageService.add({severity:'error',summary:'خطأ', detail:'حدث خطأ ما'});
        this.spinner.hide();
      }
    )
  }

  handleShowCard(){
      this.toasters.confirmationToaster({

        title: 'هل انت متأكد !',

        text: `هل تريد مسح ${this.title} ؟`,

        icon: 'question',

        confirmFunc: () => {

          let payload: any = {
            title: this.title,
            unit_type: this.unit_type,
            commission: this.commission,
            is_active : false
          };

          this.showBannerAPI(payload)

        },

        onDismiss: () => {
          
        }

      })



}

showBannerAPI(body : any){
  this.http.put(`/productmanager/admin/categories/${this.id}/`,body).subscribe(
    res=>{
      this.messageService.add({severity:'success',summary:'تم', detail:' تنفيذ العملية بنجاح'});
      setTimeout(() => {
        this.view.emit('show SubCategory')
      }, 500);
      this.spinner.hide();
    },
    err=>{
      this.messageService.add({severity:'error',summary:'خطأ', detail:'حدث خطأ ما'});
      this.spinner.hide();
    }
  )
}
}
