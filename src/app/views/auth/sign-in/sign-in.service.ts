import { Configure } from 'src/app/configure';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  constructor(private httpClient: HttpClient) { }
  private config = new Configure();

  login(data:any){
    const param = new HttpParams()
    .set('username', data.username)
    .set('password', data.password);
    return this.httpClient.post(this.config.urlAccount.concat('/login'), {params: param});
  }
}
