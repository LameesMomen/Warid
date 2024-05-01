import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-rows-view',
  templateUrl: './rows-view.component.html',
  styleUrls: ['./rows-view.component.css']
})
export class RowsViewComponent {
@Input() allProductList:any;
@Output() realodProduct = new EventEmitter<boolean>();
page : number =1

constructor(private http : HttpHelperService , private spinner :  NgxSpinnerService , private messageService:MessageService,private toasters : ToastersService){}

handleShowCard(event: any, item: any) {
  this.toasters.confirmationToaster({
    title: 'هل انت متأكد !',

    text: `هل تريد مسح ${item.title} ؟`,

    icon: 'question',

    confirmFunc: () => {
      let payload: any = { ...item };

      payload.is_active = false;

      this.showBannerAPI(payload);
    },

    onDismiss: () => {

    },
  });

}

showBannerAPI(body: any) {
this.http
  .put(`/productmanager/admin/products/${body.id}/`, {
    is_active: body.is_active,
  })
  .subscribe(
    (res) => {
      this.messageService.add({
        severity: 'success',
        summary: 'تم',
        detail: ' تنفيذ العملية بنجاح',
      });
      setTimeout(() => {
        this.realodProduct.emit(true)
      }, 500);
      this.spinner.hide();
    },
    (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'خطأ',
        detail: 'حدث خطأ ما',
      });
      this.spinner.hide();
    }
  );
}
}
