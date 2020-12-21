import { HeaderService } from './../../themes/header/header.service';
import { CateProductsService } from './../../admin/services/cate-products.service';
import { ProductService } from './../products/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataTransferService } from './data-transfer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  listProduct: any;
  cateId: any;
  params:any;
  cateName;
  priceFilter = 100;
  productRecommend = [];
  listSearch;
  searchText;
  isNull;
  constructor( private activatedRoute: ActivatedRoute, private productService: ProductService, private cateService: CateProductsService, private headerService: HeaderService, private transferService: DataTransferService) { }
  listHot = [];

  keySearch = ''

  ngOnInit(): void {
    this.transferService.getMessage().subscribe((res:any)=>{
      this.searchText = res;
    });
    if(this.searchText !== '' && this.searchText !== undefined){
      this.productService.getAll().subscribe(
        (res:any)=>{
          res.data.forEach(e => {
            this.listSearch = res.data.filter((rs)=> {
              return rs.name.toLowerCase().includes(this.searchText.toLowerCase())
            })
          });
          if (this.listSearch.length === 0) {
            this.isNull=true;
          }
        },
        error=>{
          console.error(error)
        }
      )
    }  
    else {
      this.isNull = true;
    } 
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
