import { Component , EventEmitter, Input, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent {

  @Input() public id:any
  @Input() public res:any
  @Output() view = new EventEmitter<string>();

  allsubCategoryList:any;

  constructor(private http : HttpHelperService , private spinner :  NgxSpinnerService , private messageService:MessageService){

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes:any) {
    this.handleSubCategoryItems(this.id)
  }

  handleSubCategoryItems(id:any){
    this.allsubCategoryList=this.res.find((items : any)=>{
      return items.id == id
    })
    
    this.allsubCategoryList=this.allsubCategoryList.subcategories
  }

  addingSubCategory(){
    this.view.emit('add subCategory')
  }
}
