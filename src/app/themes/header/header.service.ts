import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();

  getAllCate(){
    return this.httpClient.get(this.config.urlCateProduct.concat('/getAll'))
  }

}
