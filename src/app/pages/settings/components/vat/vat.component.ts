import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.css']
})
export class VatComponent implements OnInit{

  vat:any
  editvatValue:any
  editvat:boolean=false
  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService , private  messageService : MessageService){}

  ngOnInit(): void {
    this.getVat()
  }

  getVat(){
    this.spinner.show()
    this.http.get('/settings/vat/').subscribe(
      (res:any)=>{
        this.vat=res.value
        this.editvatValue=res.value
        this.spinner.hide()
      },err=>{
        console.log(err)
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
        this.spinner.hide()
      }
    )
  }

  updateVat(){
    this.spinner.show()
    this.http.put('/settings/vat/',{"value":this.editvatValue}).subscribe(
      (res:any)=>{
        this.getVat()
        this.editvat=false
        this.spinner.hide()
      },err=>{
        console.log(err)
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
        this.spinner.hide()
      }
    )
  }
}
