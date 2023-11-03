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
  subCategoryIndex:any

  setView:string=''

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
        this.subCategoryIndex=res[0].id
        this.setView='show SubCategory'

        this.spinner.hide();
      },
      err =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});

      }
    )
  }

  handleSubCategoryItems(id:any){
    this.subCategoryIndex = id
    this.setView='show SubCategory'
  }

  changeView(value:any){
    this.setView=value
  }
}
