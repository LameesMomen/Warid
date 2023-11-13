import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent {

  patternLink : string ='(https?:\/\/.*\.)';
  imageFile:any;
  constructor(private http : HttpHelperService,private spinner : NgxSpinnerService, private messageService : MessageService , private router : Router){}

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
}
