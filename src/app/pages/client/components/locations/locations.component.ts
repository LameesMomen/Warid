import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { HttpHelperService } from 'src/app/core/services/http-helper/http-helper.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit{

  @Input() public id: any;
  allLocation:any
  dialogContent:any
  page : number =1
  visible: boolean = false;

  constructor(
    private http: HttpHelperService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
  ){}


  ngOnInit(): void {
    this.getLocations()
  }

  getLocations(){
    this.spinner.show()
    this.http.get('/locationmanager/admin/locations/').subscribe(
      (res:any)=>{
        this.getClientLocations(res)
      },
      err =>{
        this.spinner.hide()
        this.messageService.add({severity:'error', summary:'خطأ', detail:'حدث خطأ ما'});
      }
    )
  }


  getClientLocations(res:any){
    this.allLocation = res.filter((items: any) => {
      return items.owner.id == this.id;
    });
    this.spinner.hide()
  }


  showDialog(id:any) {
      this.visible = true;
      this.dialogContent = this.allLocation.find((items: any) => {
        return items.id == id;
      });

      console.log(this.dialogContent)
  }
}
