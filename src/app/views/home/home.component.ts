import { HeaderService } from './../../themes/header/header.service';
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
  constructor(private homeService: HomeService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.getListNewProduct();
  }

  onChangePage(event){

  }

  getListNewProduct(){
    this.homeService.getHotProduct().subscribe((res: any) => {
      this.listProductHot = res.data.hotProducts;
      this.listProductRecomment = res.data.productsRecommend;
      this.listNewProduct = res.data.newProducts;
    })
  }

  listCart = [];

  addToCart(productId){
    if(localStorage.getItem('cart')){
      this.listCart = JSON.parse(localStorage.getItem('cart'));
    }
    const data = {
      id : productId,
      quantity: 1
    }
    if(!this.listCart.includes(this.listCart.find(res => res.id === productId))){
      this.listCart.push(data);
      this.headerService.count = this.headerService.count + 1;
      document.getElementById('count').innerText = (this.headerService.count).toString();
    }
    localStorage.setItem('cart',JSON.stringify(this.listCart));
  }

}
