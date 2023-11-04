import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  allCategories:any;
  firstCategoryChecked:any;
  productCategoryIndex:any


  setView:string=''
  styleView:string='boxesView'

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
        this.productCategoryIndex=res[0].id
        this.setView='show product'

        this.spinner.hide();
      },
      err =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});

      }
    )
  }

  handleProductCategoryItems(id:any){
    this.productCategoryIndex = id
    this.setView='show product'
  }

  changeView(value:any){
    this.setView=value
  }

  changeStyleView(value:any){
    this.styleView=value
  }
}
