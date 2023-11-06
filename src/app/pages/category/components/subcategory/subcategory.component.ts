import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css'],
})
export class SubcategoryComponent {
  @Input() public id: any;
  @Input() public res: any;
  @Output() view = new EventEmitter<string>();
  @Output() subCategoryId = new EventEmitter<number>();
  @Output() parentId = new EventEmitter<number>();

  allsubCategoryList: any;

  visible: boolean = false;

  constructor(
    private http: HttpHelperService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private toasters: ToastersService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: any) {
    this.handleSubCategoryItems(this.id);
  }

  handleSubCategoryItems(id: any) {
    this.allsubCategoryList = this.res.find((items: any) => {
      return items.id == id;
    });

    this.allsubCategoryList = this.allsubCategoryList.subcategories;
  }

  addingSubCategory() {
    this.view.emit('add subCategory');
  }

  handleShowCard(event: any, item: any) {
    if (item.is_active == false) {
      this.toasters.confirmationToaster({
        title: 'هل انت متأكد !',

        text: `هل تريد اخفاء ${item.title} ؟`,

        icon: 'question',

        confirmFunc: () => {
          let payload: any = { ...item };

          payload.is_active = false;

          this.showBannerAPI(payload);
        },

        onDismiss: () => {
          item.is_active = !item.is_active;
        },
      });
    } else {
      this.toasters.confirmationToaster({
        title: 'هل انت متأكد !',

        text: `هل تريد اظهار ${item.title} ؟`,

        icon: 'question',

        confirmFunc: () => {
          let payload: any = { ...item };

          payload.is_active = true;

          this.showBannerAPI(payload);
        },

        onDismiss: () => {
          item.is_active = !item.is_active;
        },
      });
    }
  }

  showBannerAPI(body: any) {
    this.http
      .put(`/productmanager/admin/categories/${body.id}/`, {
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
            this.view.emit('show SubCategory');
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
