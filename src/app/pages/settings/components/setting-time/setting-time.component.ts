import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-setting-time',
  templateUrl: './setting-time.component.html',
  styleUrls: ['./setting-time.component.css']
})
export class SettingTimeComponent implements OnInit{
  editAcceptTime:boolean = false
  editAcceptTimeValue:any 
  editCancelTime:boolean = false
  editCancelTimeValue:any 


  acceptTime:any
  cancelTime:any

  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService , private  messageService : MessageService){}

  ngOnInit(): void {
    this.getAcceptTime()
    this.getCancelTime()
  }

  getAcceptTime(){
    this.spinner.show()
    this.http.get('/settings/accept_order/').subscribe(
      (res:any)=>{
        this.acceptTime=res.value/60
        this.acceptTime=parseInt(this.acceptTime)
        this.editAcceptTimeValue=this.acceptTime
        this.spinner.hide()
      },err=>{
        console.log(err)
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  getCancelTime(){
    this.spinner.show()
    this.http.get('/settings/cancel_order/').subscribe(
      (res:any)=>{
        this.cancelTime=res.value/60
        this.cancelTime=parseInt(this.cancelTime)
        this.editCancelTimeValue=this.cancelTime
        this.spinner.hide()
      },err=>{
        console.log(err)
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  updateAcceptTime(){
    this.spinner.show()
    this.http.put('/settings/accept_order/',{"value":this.editAcceptTimeValue*60}).subscribe(
      (res:any)=>{
        this.getAcceptTime()
        this.editAcceptTime=false
        this.spinner.hide()
      },err=>{
        console.log(err)
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  updateCancelTime(){
    this.spinner.show()
    this.http.put('/settings/cancel_order/',{"value":this.editCancelTimeValue*60}).subscribe(
      (res:any)=>{
        this.getCancelTime()
        this.editCancelTime=false
        this.spinner.hide()
      },err=>{
        console.log(err)
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }
}
