import { Configure } from 'src/app/configure';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  private config = new Configure();

  getHotProduct(){
    return this.httpClient.get(this.config.urlProduct.concat('/getAll'));
  }

  getProductSemilar(){
    return this.httpClient.get(this.config.urlProduct.concat('/getSemilar'));
  }


  getNewProduct(){
    return this.httpClient.get(this.config.urlProduct.concat('/getNew'));
  }
}
