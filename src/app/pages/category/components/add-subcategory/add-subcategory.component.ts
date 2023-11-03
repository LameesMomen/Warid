import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent {

  @Input() public id:any
  @Output() view = new EventEmitter<string>();

  constructor(private http : HttpHelperService , private spinner: NgxSpinnerService , private messageService : MessageService){}

  submit(form:any){
    this.spinner.show();
    let body :{'title' :  string , 'parent_category' : number}={
      title: form.value.title,
      parent_category: this.id
    }

    this.http.post('/productmanager/categories/',body).subscribe(
      res=>{
        this.messageService.add({severity:'success',summary:'تم', detail:' تنفيذ العملية بنجاح'});
        this.view.emit('show SubCategory')
        this.spinner.hide();
      },
      err=>{
        this.messageService.add({severity:'error',summary:'خطأ', detail:'حدث خطأ ما'});
        this.spinner.hide();
      }
    )
  }
}
