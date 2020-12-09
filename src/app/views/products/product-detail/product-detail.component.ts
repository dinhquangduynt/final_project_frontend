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
  detail : any;
  productId: any;
  listProductSemilar = [];
  currentRate = 3.5;
  cateId;
  cateName;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private cateService: CateProductsService) { }

  ngOnInit(): void {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('productId'));
    this.getProduct();
    this.getProductSemilar();
  }

  getProduct(){
    this.productService.getProductById(this.productId).subscribe(
      (res: any) => {
        this.detail = res.data;
        this.cateId = res.data.categoryId;
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

  getProductSemilar(){
    this.productService.getProductSemilar().subscribe((res: any) => {
      this.listProductSemilar = res.data;
    })
  }

}
