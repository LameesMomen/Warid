import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  filtered: any; 
  filteredArray: any; 
  currentView:string=''


  constructor(private http : HttpHelperService , private messageService : MessageService   , public route : Router){}


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
