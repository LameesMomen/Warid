import { AfterContentInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input() response :any;
  @Input() rating : any;
  visibleDelieveryImage: boolean = false;
  visiblePaymentImage: boolean = false;
  regex = /(?<!^).(?!$)/g;

  constructor(private http:HttpHelperService,private  messageService : MessageService){}

  showDialogDelievery() {
    this.visibleDelieveryImage = true;
  }
  showDialogPayment() {
    this.visiblePaymentImage = true;
  }

  downloadReciet(id:any){
    this.http.getPDF(`/ordermanager/receipt/${id}`).subscribe(
      (res:any)=>{
        let blob = new Blob([res], {type: 'application/pdf'});

        var downloadURL = window.URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "receipt.pdf";
        link.click();
      },
      err=>{
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )

  }
}
