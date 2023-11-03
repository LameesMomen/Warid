import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  @Output() view = new EventEmitter<string>();

  constructor(private http : HttpHelperService , private spinner: NgxSpinnerService , private messageService : MessageService){}

  submit(form:any){
    this.spinner.show();
    let body :{'title' :  string , 'unit_type' : string}={
      title: form.value.title,
      unit_type: form.value.unit_type
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
