import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  count = 0;
  constructor(private httpClient: HttpClient) { 
    this.count = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0;
  }
  private config = new Configure();

  getAllCate(){
    return this.httpClient.get(this.config.urlCateProduct.concat('/getAll'))
  }

}
