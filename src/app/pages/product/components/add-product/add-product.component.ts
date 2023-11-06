import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Output() view = new EventEmitter<string>();

  productImage: any;
  allCategories: any;
  allSubCategories: any;
  imageFile!: Blob | any;

  constructor(
    private http: HttpHelperService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {
    this.productImage = 'assets/dummyimage.png';
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.spinner.show();
    this.http.get('/productmanager/admin/categories/').subscribe(
      (res: any) => {
        this.allCategories = res;
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

  showSubCategory(id: any) {
    this.allSubCategories = this.allCategories.find((items: any) => {
      return items.id == id;
    });

    this.allSubCategories = this.allSubCategories.subcategories;
  }

  changeImage(event: any) {
    this.imageFile = event.target.files[0];
    this.productImage = URL.createObjectURL(this.imageFile);
  }
  
  submit(form: any) {
    this.spinner.show();
    
    var file: Blob = this.imageFile == undefined ? new Blob :this.imageFile;

    let body: { title: string; pic: Blob; category: number } = {
      title: form.value.title,
      pic: file,
      category: form.value.subcategory
        ? form.value.subcategory
        : form.value.category,
    };

    this.http.postImage('/productmanager/admin/products/', body).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم',
          detail: ' تنفيذ العملية بنجاح',
        });
        this.view.emit('show product');
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

  // base64ToFile(base64: any, filename: string) {
  //   var arr = base64.split(','),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   return new File([u8arr], filename, { type: mime });
  // }
}
