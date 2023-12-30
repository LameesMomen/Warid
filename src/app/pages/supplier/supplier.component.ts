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
  show:boolean = false

  constructor(private http:HttpHelperService,private messageService : MessageService , private  spinner:NgxSpinnerService){}
  ngOnInit(): void {
    this.getClientsData()
  }

  getClientsData(){
    this.spinner.show();
    this.http.get('/ordermanager/supplier/orders/').subscribe(
      (res:any)=>{
        this.AllclientsData=res.active;
        this.spinner.hide();
      },
      err  =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  filterTable(value:string){
    if(value == '24H'){
      this.filteredArray = this.AllclientsData.filter((item:any) => (new Date(item.created_at).getTime() > Date.now() - 24 * 60 * 60 * 1000))
    }else if(value == '2D'){
      this.filteredArray = this.AllclientsData.filter((item:any) => (new Date(item.created_at).getTime() > Date.now() - 48 * 60 * 60 * 1000))
    }else if(value == 'week'){
      this.filteredArray = this.AllclientsData.filter((item:any) => (new Date(item.created_at).getTime() > Date.now() - (7*24) * 60 * 60 * 1000))
    }
    else if(value == 'month'){
      this.filteredArray = this.AllclientsData.filter((item:any) => (new Date(item.created_at).getTime() > Date.now() - (30*24) * 60 * 60 * 1000))
    }else if(value == 'year'){
      this.filteredArray = this.AllclientsData.filter((item:any) => (new Date(item.created_at).getTime() > Date.now() - (265*24) * 60 * 60 * 1000))
    }else{
      this.filteredArray=0
    }
    this.show = false
  }



  inputFocus(value:any){
    this.filteredArray = this.AllclientsData.filter((item:any)=>{
      return item.id == value || item.location.project_name.includes(value)
    })
    
    }
  
}
