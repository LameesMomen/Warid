import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';
import { ToastersService } from 'src/app/core/services/toaster/toasters.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit{

  clientMobiles: any;

  filteredClientMobiles: any; 

  patternLink : string ='(https?:\/\/.*\.)';
  imageFile:any;
  client_mobile : any
  location_name : any
  project_name : any
  building_license : any
  google_maps_link : any
  guard_mobile : any
  neighborhood : any
  city : any

  id:any
  constructor(private toasters : ToastersService,private http : HttpHelperService,private spinner : NgxSpinnerService, private messageService : MessageService , private router : Router,private route : ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getData()
    this.getAllClients()
  }

  getData(){
    this.spinner.show()
    this.http.get(`/locationmanager/admin/locations/${this.id}`).subscribe(
      (res:any)=>{
        this.client_mobile = res.owner.mobile
        this.location_name = res.location_name
        this.project_name = res.project_name
        this.building_license = res.building_license
        this.google_maps_link = res.google_maps_link
        this.guard_mobile = res.guard_mobile
        this.neighborhood = res.neighborhood
        this.city = res.city
        this.spinner.hide()
      },
      err =>{
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }

  getAllClients(){
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

    body.append('client_mobile', this.client_mobile);
    body.append('location_name', this.location_name);
    body.append('project_name', this.project_name);
    body.append('building_license', file ? file : this.building_license);
    body.append('google_maps_link', this.google_maps_link);
    body.append('guard_mobile', this.guard_mobile);
    body.append('neighborhood', this.neighborhood);
    body.append('city', this.city);

    this.http.put(`/locationmanager/admin/locations/${this.id}`,body).subscribe(
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
            filtered.push(client.mobile);
        }
    }

    this.filteredClientMobiles = filtered;
}

  handleShowCard(){
    this.toasters.confirmationToaster({

      title: 'هل انت متأكد !',

      text: `هل تريد مسح ${this.project_name} ؟`,

      icon: 'question',

      confirmFunc: () => {

        this.delete()

      },

      onDismiss: () => {
        
      }

    })

}

delete(){
  this.spinner.show();
  this.http.deleteLocation(`/locationmanager/admin/locations/${this.id}`).subscribe(
    res=>{
      this.spinner.hide();
      this.messageService.add({severity:'success',summary:'تم', detail:' تنفيذ العملية بنجاح'});
      setTimeout(() => {
        this.router.navigateByUrl('/locations')
      }, 500);
    },
    err=>{
      this.spinner.hide();
      this.messageService.add({severity:'error',summary:'خطأ', detail:'حدث خطأ ما'});
    }
  )
}
}
