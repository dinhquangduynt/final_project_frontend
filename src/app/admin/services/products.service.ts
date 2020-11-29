import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  private config = new Configure();
  getAll(){
    return this.httpClient.get(this.config.urlProduct.concat("/getAll"));
  }

  getByProductId(productId){
    return this.httpClient.get(this.config.urlProduct.concat("/getById/") + productId)
  }

  deleteProduct(productId : string){
    return this.httpClient.delete(this.config.urlProduct.concat("/delete/") +productId);
  }
  addProduct(product: any){
    return this.httpClient.post(this.config.urlProduct.concat("/add"), product);
  }

  updateProduct(product: any){
    return this.httpClient.put(this.config.urlProduct.concat("/update"), product)
  }
} 
