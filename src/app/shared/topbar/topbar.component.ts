import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements  OnInit {

  clientMobiles: any;
  supplierMobiles: any;
  filtered: any; 
  filteredArray: any; 
  userName:string=''
  show:boolean = false
  currentView:string=''

  constructor(private http : HttpHelperService , private messageService : MessageService   , public route : Router){}


  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.http.get('/auth/user/').subscribe(
      (res:any)=>{
        this.userName = res.username
      },
      err =>{
        this.messageService.add({severity:'error', summary:'خطأ', detail:'كلمة المرور او البريد الاكتروني غير صحيح'});
      }
    )
  }

  getClient(){
    this.http.get('/auth/admin/client/list/').subscribe(
      (res:any)=>{
        this.clientMobiles=res;
      },
      err  =>{
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  getSupplier(){
    this.http.get('/auth/admin/supplier/list/').subscribe(
      (res:any)=>{
        this.supplierMobiles=res;
      },
      err  =>{
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  logOut(){
    this.http.post('/auth/logout/',{refresh:localStorage.getItem('refreshToken')}).subscribe(
      res =>{
        localStorage.clear();
        this.route.navigateByUrl('/login');
      },
      err=>{
        this.messageService.add({severity:'error', summary:'خطأ', detail:'كلمة المرور او البريد الاكتروني غير صحيح'});
      }
    )
  }

  inputFocus(){
    if(this.route.url.includes('client')){
      this.getClient()
      this.filteredArray=this.clientMobiles
      this.currentView = 'client'
    }
    else{
      this.getSupplier()
      this.filteredArray=this.supplierMobiles
      this.currentView = 'supplier'
    }
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.filteredArray as any[]).length; i++) {
        let item = (this.filteredArray as any[])[i];
        if (item.mobile.toLowerCase().includes(query.toLowerCase())) {
            filtered.push(item.mobile);
        }
    }

    this.filtered = filtered;
}

  submit(form:any){
    if(form.value.search){
        this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.route.navigate([`${this.currentView}`]);
      });
  
        setTimeout(() => {
          this.route.navigateByUrl(`/${this.currentView}/search/${form.value.search}`)
        }, 10); 
    }
    else{
      this.route.navigateByUrl(`/${this.currentView}`)
    }

  }

}
