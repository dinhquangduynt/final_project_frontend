import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configure } from 'src/app/configure';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient: HttpClient) { }
  private config = new Configure();

  getAll(){
    return this.httpClient.get(this.config.urlFeedback.concat('/getAll'))
  }
  getDetail(feedbackId:any){
    return this.httpClient.get(this.config.urlFeedback.concat('/getById/') + feedbackId)
  }
  addFeedBack(data:any){
    const formData = new FormData();
    formData.append('json', JSON.stringify(data));
    return this.httpClient.post(this.config.urlFeedback.concat('/add'), formData)
  }
  delete(feedbackId:any){
    return this.httpClient.delete(this.config.urlFeedback.concat('/delete/') +feedbackId)
  }
}
