import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  AllclientsData:any
  page:number = 1

  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService , private messageService : MessageService){}
  ngOnInit(): void {
   this.getClientsData()
  }

  getClientsData(){
    this.spinner.show();
    this.http.get('/auth/admin/client/list/').subscribe(
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

}
