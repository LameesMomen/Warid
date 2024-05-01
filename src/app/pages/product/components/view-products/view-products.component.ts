import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent {

  @Input() public id:any
  @Input() styleView:any

  @Output() emptyView = new EventEmitter<boolean>();
  
  allProductList:any;
  page : number =1

  constructor(private http : HttpHelperService , private spinner :  NgxSpinnerService , private messageService:MessageService,private toasters : ToastersService){

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes:any) {
    if(changes.id){
      this.handleProductItems(this.id)
      this.page=1
    }
  }

  reloadProduct(value:any){
    value ? this.handleProductItems(this.id) : ''
  }

  handleProductItems(id:any){
    this.spinner.show();
    this.http.get(`/productmanager/admin/products/?category_id=${id}`).subscribe(
      (res:any)=>{
        this.allProductList=res;
        this.allProductList.length ? this.emptyView.emit(false) : this.emptyView.emit(true)
        this.spinner.hide()
      },
      err =>{
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
        this.spinner.hide()
      }
    )
  }


}
