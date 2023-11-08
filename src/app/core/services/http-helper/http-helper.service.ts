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
    return this.http.get('http://34.147.213.123'+url)
  }

  post(url:string , payload : any){
    return this.http.post('http://34.147.213.123'+url , payload)
  }

  postImage(url:string , payload : any):Observable<any>{

    const formData = new FormData();

    formData.append('pic', payload.pic);
    formData.append('category', payload.category);
    formData.append('title', payload.title);

    return this.http.post('http://34.147.213.123'+url , formData ,{responseType:'text'})
  }

  put(url:string , payload : any){
    return this.http.put('http://34.147.213.123'+url , payload)
  }

  delete(url:string , payload : any){
    return this.http.post('http://34.147.213.123'+url , payload)
  }
}
