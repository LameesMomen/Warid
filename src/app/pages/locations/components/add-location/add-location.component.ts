import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit{

  clientMobiles: any;

  filteredClientMobiles: any; 

  patternLink : string ='(https?:\/\/.*\.)';
  imageFile:any;
  constructor(private http : HttpHelperService,private spinner : NgxSpinnerService, private messageService : MessageService , private router : Router){}

  ngOnInit(): void {
    this.spinner.show();
    this.http.get('/auth/admin/client/list/').subscribe(
      (res:any)=>{
        this.clientMobiles=res;
        this.spinner.hide();
      },
      err  =>{
        this.spinner.hide();
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  changeImage(event: any) {
    console.log(event)
    this.imageFile = event.target.files[0];
  }

  submit(form:any){
    this.spinner.show();

    var file: Blob = this.imageFile == undefined ? new Blob :this.imageFile;

    const body = new FormData();

    body.append('client_mobile', form.value.ownerNumber);
    body.append('location_name', form.value.locationName);
    body.append('neighborhood', form.value.neighborhood);
    body.append('city', form.value.city);
    body.append('project_name', form.value.projectName);
    body.append('building_license', file);
    body.append('google_maps_link', form.value.locationPlace);
    body.append('guard_mobile', form.value.guardNumber);

    this.http.post('/locationmanager/admin/locations/',body).subscribe(
      res=>{
        this.spinner.hide();
        this.messageService.add({severity:'success',summary:'تم', detail:' تنفيذ العملية بنجاح'});
        setTimeout(() => {
          this.router.navigateByUrl('/locations')
        }, 500);
      },
      err=>{
        this.messageService.add({severity:'error',summary:'خطأ', detail:'حدث خطأ ما'});
        this.spinner.hide();
      }
    )
  }



  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.clientMobiles as any[]).length; i++) {
        let client = (this.clientMobiles as any[])[i];
        if (client.mobile.toLowerCase().includes(query.toLowerCase())) {
            filtered.push(client);
        }
    }

    this.filteredClientMobiles = filtered;
}
}
