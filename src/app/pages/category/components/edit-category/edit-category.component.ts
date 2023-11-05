import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

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

  constructor(private http : HttpHelperService , private spinner: NgxSpinnerService , private messageService : MessageService){}

  ngOnInit(): void {
    this.getCategoryById()
  }

  ngOnChanges(changes:any) {
    this.getCategoryById()
  }

  getCategoryById(){
    this.spinner.show()
    this.http.get(`/productmanager/categories/${this.id}`).subscribe(
      (res:any)=>{
        this.title=res.title;
        this.unit_type=res.unit_type;
        this.commission=res.commission;
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
    let body :{'title' :  string , 'unit_type' : string , 'commission' : any , 'parent_category' : any}={
      title: this.title,
      unit_type: this.unit_type,
      commission: this.commission,
      parent_category: null
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

  delete(){}
}
