import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-association-order-detail',
  templateUrl: './association-order-detail.component.html',
  styleUrls: ['./association-order-detail.component.css']
})
export class AssociationOrderDetailComponent implements OnInit {
  id: any;
  data: any;
  constructor(
    private http: HttpHelperService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private toasters: ToastersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.http.get(`/locationmanager/admin/associations/${this.id}`).subscribe(
      (res: any) => {
        this.spinner.show();
        this.data = res;
      },
      (err) => {
        this.spinner.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'حدث خطأ ما',
        });
      }
    );
  }

  apprroved(item: any) {
    this.toasters.confirmationToaster({
      title: 'هل انت متأكد !',

      text: `هل تريد تنفيذ طلب ${item.id} ؟`,

      icon: 'question',

      confirmFunc: () => {
        let payload: any = { ...item };

        this.showBannerAPI(payload);
      },

      onDismiss: () => { },
    });
  }

  showBannerAPI(body: any) {
    this.http
      .put(`/locationmanager/admin/associations/approve/`, {
        id: body.id,
      })
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'تم',
            detail: ' تنفيذ العملية بنجاح',
          });
          setTimeout(() => {
            this.router.navigateByUrl('/orders')
          }, 10);
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
