import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export default class CategoryComponent implements OnInit {

  allCategories:any;
  allsubCategoryList:any;
  firstCategoryChecked:any;

  constructor(private http : HttpHelperService , private spinner :  NgxSpinnerService , private messageService:MessageService){}

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    this.spinner.show();

    this.http.get('productmanager/categories/').subscribe(
      (res:any)=>{
        this.allCategories = res;
        this.firstCategoryChecked=res[0].id
        this.allsubCategoryList=res[0].subcategories
        this.spinner.hide();
      },
      err =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});

      }
    )
  }

  handleSubCategoryItems(id:any){
    this.spinner.show();

    this.http.get('productmanager/categories/').subscribe(
      (res:any)=>{
        this.allsubCategoryList=res.find((items : any)=>{
          return items.id == id
        })
        
        this.allsubCategoryList=this.allsubCategoryList.subcategories

        this.spinner.hide();
      },
      err =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }
}
