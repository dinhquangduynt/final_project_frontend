import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class CateProductsService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();

  
}
