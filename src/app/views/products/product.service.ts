import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();

  getAllProductbyCateId(cateId: string){
    return this.httpClient.get(this.config.urlProduct.concat('/getByCateId/') + cateId);
  }

  getProductById(productId: string){
    return this.httpClient.get(this.config.urlProduct.concat('/getById/') + productId);
  }

  getAll(){
    return this.httpClient.get(this.config.urlProduct.concat('/getAll'))
  }
}
