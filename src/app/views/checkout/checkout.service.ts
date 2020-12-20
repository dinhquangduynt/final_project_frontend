import { Configure } from './../../configure/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient) { }

  config = new Configure();


  addOrder(data){
    return this.httpClient.post(this.config.urlOrder.concat("/add"), data);
  }


}
