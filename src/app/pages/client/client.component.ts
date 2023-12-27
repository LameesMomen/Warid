import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  page:number = 1
  AllclientsData:any
  filtered: any; 
  filteredArray: any; 
  currentView:string=''
  search:string = ''

  constructor(private http:HttpHelperService,private messageService : MessageService , private  spinner:NgxSpinnerService , private route:Router){}
  ngOnInit(): void {
    this.getClientsData()
  }

  getClientsData(){
    this.spinner.show();
    this.http.get('/ordermanager/client/orders/').subscribe(
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
