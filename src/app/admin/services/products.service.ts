import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }


  getAll(){
    return this.httpClient.get("http://192.168.1.2:8880".concat("/api/product/getAll"));
  }
  
} 
