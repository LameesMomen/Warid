import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import swiperCore, { Navigation, SwiperOptions } from 'swiper';

swiperCore.use([Navigation])


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
  categoryId:any
  setView:string=''

  // for edit sub category

  subCategoryId:any
  parentId:any


  constructor(private http : HttpHelperService , private spinner :  NgxSpinnerService , private messageService:MessageService , private router : Router){}

  swiperOption : SwiperOptions  ={
    slidesPerView : 4,

    breakpoints :{
      320:{
        slidesPerView : 2
      },
      560:{
        slidesPerView : 3
      },
      860:{
        slidesPerView : 3
      },
    }
  }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    this.spinner.show();

    this.http.get('/productmanager/admin/categories/').subscribe(
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
    if(value == 'show SubCategory'){
      // location.reload()
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['category']);
    });
    }
    this.setView=value
  }

  editCategory(id:any){
    this.categoryId=id;
    this.setView='edit category'
  }


  // For Edit SubCategory
  subCategoryIdForEditSubCategory(value:any){
    this.subCategoryId = value
  }

  parentIdForEditSubCategory(value:any){
    this.parentId = value
  }
}
