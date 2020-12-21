import { HeaderService } from './../../../themes/header/header.service';
import { CateProductsService } from './../../../admin/services/cate-products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public Editor = ClassicEditor;
  detail = {
    alias: '',
    categoryId: '',
    content: '',
    createBy: '',
    create_date: '',
    description: '',
    homeFlg: '',
    hotFlg: '',
    id: '',
    images: [],
    name: '',
    newPrice: '',
    oldPrice: '',
    price: '',
    quantity: '',
    rating: '',
    status: '',
    updateBy: '',
    update_date: '',
    viewCount: '',
    warranty: ''
  }
  productId: any;
  listProductSemilar = [];
  currentRate = 3.5;
  cateId;
  cateName;
  math = Math;
  countRated = 0;
  quantityOrder = 1;
  feedbacks = [];
  rate = 0;
  isLogin = false;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private cateService: CateProductsService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('productId'));
    this.productService.getProductById(this.productId).subscribe(
      (res: any) => {
        this.detail = res.data.product;
        this.cateId = res.data.product.categoryId;
        this.listProductSemilar = res.data.productsRecommend;
        this.countRated = res.data.countRated;
        this.feedbacks = res.data.feedbacks;
        this.cateService.getById(this.cateId).subscribe(
          (res: any) => {
            this.cateName = res.data.name;
          },
          error => {
            console.log(error);
          }
        )
      },
      error => {
        console.log(error);
        this.detail = null;
      }
    )
  }
  listCart = [];
  addtocart(id) {
    if (localStorage.getItem('cart')) {
      this.listCart = JSON.parse(localStorage.getItem('cart'));
    }
    const data = {
      id: id,
      quantity: this.quantityOrder
    }
    if (!this.listCart.includes(this.listCart.find(res => res.id === id))) {
      this.listCart.push(data);
      this.headerService.count = this.headerService.count + 1;
      document.getElementById('count').innerText = (this.headerService.count).toString();
    }
    localStorage.setItem('cart', JSON.stringify(this.listCart));
  }

  clickData(id) {
    this.productId = id;
    this.getProduct();
  }

}
