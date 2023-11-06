import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  // readonly baseUrl :string = '34.147.213.123'



  constructor(private http:HttpClient) { }

  get(url:string){
    return this.http.get(url)
  }

  post(url:string , payload : any){
    return this.http.post(url , payload)
  }

  postImage(url:string , payload : any):Observable<any>{

    const formData = new FormData();

    formData.append('pic', payload.pic);
    formData.append('category', payload.category);
    formData.append('title', payload.title);

    return this.http.post(url , formData ,{responseType:'text'})
  }

  put(url:string , payload : any){
    return this.http.put(url , payload)
  }

  delete(url:string , payload : any){
    return this.http.post(url , payload)
  }
}
