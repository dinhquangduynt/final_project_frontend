import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class CateProductsService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();

  getAll(){
    return this.httpClient.get(this.config.urlCateProduct.concat('/getAll'))
  }
  getById(cateId: string){
    return this.httpClient.get(this.config.urlCateProduct.concat('/getById') + cateId)
  }
  delete(cateId: string){
    return this.httpClient.delete(this.config.urlCateProduct.concat('/delete') + cateId)
  }
  update(data: any, files){
    const formData = new FormData();
    formData.append('json', JSON.stringify(data));
    for (const file of files) {
      formData.append('files', file);
    }
    return this.httpClient.put(this.config.urlCateProduct.concat('/update'), formData)
  }
  addCateProduct(data: any,files){
    const formData = new FormData();
    formData.append('json', JSON.stringify(data));
    for (const file of files) {
      formData.append('files', file);
    }
    return this.httpClient.post(this.config.urlCateProduct.concat('/add'), formData)
  }
}
