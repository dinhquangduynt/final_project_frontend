import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();

  create(data){
    return this.httpClient.post(this.config.urlAccount.concat('/register/'), data)
  }
  getAll(){
    return this.httpClient.get(this.config.urlAccount.concat('/getAll'))
  }
  getDetail(accId){
    return this.httpClient.get(this.config.urlAccount.concat('/getUserById/') + accId)
  }
  delete(accId){
    return this.httpClient.delete(this.config.urlAccount.concat('/delete/') + accId)
  }
  update(data){
    return this.httpClient.post(this.config.urlAccount.concat('/update'), data)
  }
}
