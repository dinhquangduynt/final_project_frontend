import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure()

  getOrderByUser(id){
    return this.httpClient.get(this.config.urlOrder.concat('/getByUserId/') + id)
  }

  getUserByUsername(username){
    const param = new HttpParams().set(
      'username' , username
    )
    return this.httpClient.get(this.config.urlAccount.concat('/getUserByUsername') , {params:param})
  }
}
