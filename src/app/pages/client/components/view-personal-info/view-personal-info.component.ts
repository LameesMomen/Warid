import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-view-personal-info',
  templateUrl: './view-personal-info.component.html',
  styleUrls: ['./view-personal-info.component.css']
})
export class ViewPersonalInfoComponent implements OnInit{

  id:any
  radioValue: string ='personal';
  editMode : boolean =false;
  clientDetail : any

  constructor(private http : HttpHelperService,private spinner : NgxSpinnerService, private messageService : MessageService , private router : Router,private route : ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.spinner.show();
    this.http.get(`/auth/admin/client/list/?mobile=${this.id}`).subscribe(
      (res:any)=>{
        this.clientDetail=res[0];
        this.spinner.hide();
      },
      err  =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }
}
