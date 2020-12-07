import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items = [];
  listProductHot = [];
  listProductRecomment = [];
  listNewProduct = [];
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    location.reload();
    this.getListNewProduct();
  }

  onChangePage(event){

  }

  getListNewProduct(){
    this.homeService.getHotProduct().subscribe((res: any) => {
      this.listProductHot = res.data;
    })
  }

}
