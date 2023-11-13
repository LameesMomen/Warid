import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit{

  allLocation:any;
  page : number =1

  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService,  private messageService:MessageService){}

  ngOnInit(): void {
    this.spinner.show()
    this.http.get('/locationmanager/admin/locations/').subscribe(
      (res:any)=>{
        this.allLocation=res;
        this.spinner.hide()
      },
      err =>{
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

}
