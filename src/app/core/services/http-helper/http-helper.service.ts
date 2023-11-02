import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  delete(url:string , payload : any){
    return this.http.post(url , payload)
  }
}
