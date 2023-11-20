import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-supplier-money-info',
  templateUrl: './supplier-money-info.component.html',
  styleUrls: ['./supplier-money-info.component.css']
})
export class SupplierMoneyInfoComponent {
  @Input() public res: any;

  swiperOption : SwiperOptions  ={
    slidesPerView:1.5,
  }

  constructor(
    private http: HttpHelperService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
  ){}

  ngOnChanges(changes: any): void {
    for (let item of this.res.bank_accounts) {
        item.account_number = item.account_number.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
    }
    
  }

  // format(){
  //   const input = document.getElementById("account_number") as any;
  //   input.addEventListener("input", () => input.value = formatNumber(input.value.replaceAll(" ", "")));

  //   const formatNumber = (number:any) => number.split("").reduce((seed:any, next:any, index:any) => {
  //     if (index !== 0 && !(index % 4)) seed += " ";
  //     return seed + next;
  //   }, "");
  // }

  addCard(form:any){
    this.spinner.show();
    let body:{"bank" : string , "supplier_id" : number, "account_owner_name" : string , "account_number" : string , "iban" : string}={
      bank: form.value.bank,
      supplier_id: this.res.id,
      account_owner_name: form.value.account_owner_name,
      account_number: form.value.account_number,
      iban: form.value.iban
    }

    this.http.post('financemanager/admin/bank-accounts/',body).subscribe(
      res=>{
        this.spinner.hide();
        this.messageService.add({severity:'success',summary:'تم', detail:' تنفيذ العملية بنجاح'});
        setTimeout(() => {
          location.reload();
        }, 20);
      },
      err=>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }
}
