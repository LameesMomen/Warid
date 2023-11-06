import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.css']
})
export class EditSubcategoryComponent implements OnInit{

  title:any
  allsubCategoryList:any

  @Input()  subCategoryId:any
  @Input()  parentId:any
  @Output() view = new EventEmitter<string>();

  constructor(private http : HttpHelperService , private spinner: NgxSpinnerService , private messageService : MessageService){}

  ngOnInit(): void {
    this.getData()
    console.log(this.parentId)
  }

  getData(){
    this.spinner.show();
    this.http.get('productmanager/admin/categories/').subscribe(
      (res:any)=>{
        this.allsubCategoryList=res.find((items : any)=>{
          return items.id == this.parentId
        })
        
        this.allsubCategoryList=this.allsubCategoryList.subcategories
        this.getSubCategoryItem(this.allsubCategoryList)

        this.spinner.hide();
      },
      err =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});

      }
    )
  }

  getSubCategoryItem(list : any){
    this.title=list.find((items : any)=>{
      return items.id == this.subCategoryId
    })

    this.title=this.title.title
    console.log(this.title)
  }


  submit(form:any){
    this.spinner.show();
    let body :{'title' :  string , 'parent_category' : number}={
      title: this.title,
      parent_category: this.parentId
    }

    this.http.put(`/productmanager/admin/categories/${this.subCategoryId}/`,body).subscribe(
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
