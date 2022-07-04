import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImgixService {

  
  urlTestImages:string = "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json";

  constructor(
    private http:HttpClient
  ) { }

  getTestImages(){
    return this.http.get<any>( this.urlTestImages);
  }
}
