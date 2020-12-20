import { CateProductsService } from './../../admin/services/cate-products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { HeaderService } from 'src/app/themes/header/header.service';
import { error } from 'protractor';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  listProduct: any;
  cateId: any;
  params:any;
  cateName;
  priceFilter = 100;
  productRecommend = [];
  constructor( private activatedRoute: ActivatedRoute, private productService: ProductService, private cateService: CateProductsService, private headerService: HeaderService) { }
  listHot = [];

  keySearch = ''
  ngOnInit(): void {
    this.params = this.activatedRoute.params.subscribe(params => {
      this.cateId = params['cateId'];
      this.productService.getAllProductbyCateId(this.cateId).subscribe(
        (res: any)=>{
          this.listProduct = res.data.products;
          this.productRecommend = res.data.productsRecommend;
        },
        error=>{
        }
      )
    })
    this.cateService.getById(this.cateId).subscribe(
      (res: any) => {
        this.cateName = res.data.name;
      },
      error => {
      }
    )
  }
  onChangePage(event){

  }
  listCart = [];
  addtocart(productId){
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

  onChangeNameASC(){
    this.listProduct.sort((p1,p2) => p1.name < p2.name ? 1 : -1);
  }

  onChangeNameDESC(){
    this.listProduct.sort((p1,p2) => p1.name > p2.name ? 1 : -1);
  }

  onChangePriceDESC(){
    this.listProduct.sort((p1,p2) => p1.price > p2.price ? 1 : -1);
  }
  onChangePriceASC(){
    this.listProduct.sort((p1,p2) => p1.price < p2.price ? 1 : -1);
  }

}
