import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent {

  @Input() public id:any
  @Input() styleView:any

  @Output() view = new EventEmitter<string>();

  allProductList:any;
  page : number =1

  constructor(private http : HttpHelperService , private spinner :  NgxSpinnerService , private messageService:MessageService){

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes:any) {
    if(changes.id){
      this.handleProductItems(this.id)
    }
  }

  handleProductItems(id:any){
    this.spinner.show();
    this.http.get(`/productmanager/products/?category_id=${id}`).subscribe(
      (res:any)=>{
        this.allProductList=res;
        this.spinner.hide()
      },
      err =>{
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
        this.spinner.hide()
      }
    )
  }

  onDataChange(event:any){}
}
