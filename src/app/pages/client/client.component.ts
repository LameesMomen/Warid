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
  constructor(private http:HttpHelperService,private messageService : MessageService , private  spinner:NgxSpinnerService){}
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


  
  inputFocus(){
    // if(this.route.url.includes('client')){
    //   this.filteredArray=this.clientMobiles
    //   this.currentView = 'client'
    // }
    // else{
    //   this.filteredArray=this.supplierMobiles
    //   this.currentView = 'supplier'
    // }
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.filteredArray as any[]).length; i++) {
        let item = (this.filteredArray as any[])[i];
        if (item.mobile.toLowerCase().includes(query.toLowerCase())) {
            filtered.push(item.mobile);
        }
    }

    this.filtered = filtered;
}
}
