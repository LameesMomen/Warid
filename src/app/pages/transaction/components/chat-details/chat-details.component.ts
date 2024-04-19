import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.css']
})
export class ChatDetailsComponent implements OnInit{
  @Input() id:any;
  response:any;

  constructor(private http : HttpHelperService , private spinner : NgxSpinnerService , private  messageService : MessageService){}

  ngOnInit(): void {
    this.getChat();
  }

  getChat(){
    this.spinner.show()
    this.http.get(`/ordermanager/admin/chats/${this.id}/`).subscribe(
      (res:any)=>{
        this.spinner.hide();
        this.response=res;
        console.log(this.response)
      },
      err =>{
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }
}
