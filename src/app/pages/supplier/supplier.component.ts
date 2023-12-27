import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  page:number = 1
  AllclientsData:any
  filtered: any; 
  filteredArray: any; 
  currentView:string=''
  search:string = ''

  constructor(private http:HttpHelperService,private messageService : MessageService , private  spinner:NgxSpinnerService){}
  ngOnInit(): void {
    this.getClientsData()
  }

  getClientsData(){
    this.spinner.show();
    this.http.get('/ordermanager/supplier/orders/').subscribe(
      (res:any)=>{
        this.AllclientsData=res;
        this.spinner.hide();
      },
      err  =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }


  inputFocus(value:any){
    this.filteredArray = this.AllclientsData.filter((item:any)=>{
      return item.id == value || item.location.project_name.includes(value)
    })
    
    }
  
}
