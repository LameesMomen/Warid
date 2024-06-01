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

  // readonly baseUrl :string = '34.39.7.165'



  constructor(private http:HttpClient) { }

  get(url:string){
    return this.http.get('http://34.39.7.165' + url)
  }
  getPDF(url:string){
    return this.http.get('http://34.39.7.165' + url,{responseType:'blob'})
  }

  post(url:string , payload : any){
    return this.http.post('http://34.39.7.165' + url , payload)
  }

  postImage(url:string , payload : any):Observable<any>{

    const formData = new FormData();

    formData.append('pic', payload.pic);
    formData.append('category', payload.category);
    formData.append('title', payload.title);

    return this.http.post('http://34.39.7.165' + url , formData ,{responseType:'text'})
  }

  put(url:string , payload : any){
    return this.http.put('http://34.39.7.165' + url , payload)
  }

  delete(url:string , payload : any){
    return this.http.post('http://34.39.7.165' + url , payload)
  }
  deleteLocation(url:string){
    return this.http.delete('http://34.39.7.165' + url)
  }
}
