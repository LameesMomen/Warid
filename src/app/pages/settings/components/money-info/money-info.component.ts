import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-money-info',
  templateUrl: './money-info.component.html',
  styleUrls: ['./money-info.component.css']
})
export class MoneyInfoComponent implements OnInit {
  res: any;
  greyColors=[
    '#1a1a1a',
    '#2A2A2C',
    '#616161',
    '#717171',
    '#858585',
    '#a5a5a5',
    '#c7c7c7'
  ]

  constructor(
    private http: HttpHelperService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
  ){}

  ngOnInit(): void {
   this.getBankAccount()
  }

  getBankAccount(){
    this.spinner.show()
    this.http.get(`/financemanager/admin/wared-bank-accounts/`).subscribe(
      (res:any)=>{
        this.res=res
        for (let item of this.res) {
        item.account_number = item.account_number.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
        }
    
        this.spinner.hide()
      },
      (err)=>{
        console.log(err)
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
        this.spinner.hide()
      }
    )
  }

  next(){
    let lists =document.querySelectorAll('.credit_card');
    let parent = document.getElementById('carousel') as any;
    parent.appendChild(lists[0])
  }
  prev(){
    let lists =document.querySelectorAll('.credit_card');
    let parent = document.getElementById('carousel') as any;
    parent.prepend(lists[lists.length - 1])
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
    let body:{"bank" : string , "account_owner_name" : string , "account_number" : string , "iban" : string}={
      bank: form.value.bank,
      account_owner_name: form.value.account_owner_name,
      account_number: form.value.account_number,
      iban: form.value.iban
    }

    this.http.post('/financemanager/admin/wared-bank-accounts/',body).subscribe(
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
