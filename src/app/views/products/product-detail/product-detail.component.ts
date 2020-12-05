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
  detail ={
    createBy: "",
    updateBy: "",
    id: "",
    name: "",
    alias: "",
    categoryId:"",
    images: "",
    newPrice: "",
    oldPrice: '',
    warranty: "",
    description: "",
    content: "",
    hotFlg: "",
    homeFlg: "",
    quantity:"",
    status: "",
    viewCount: "",
    rating: "",
    create_date: "",
    update_date: ""
    }
  productId: any;
  aaaaaaaaaaaaaaaaa = "12123123";
  currentRate = 0;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('productId'));
    this.productService.getProductById(this.productId).subscribe(
      (res: any) => {
        this.detail = res.data;
      },
      error => {
        console.log(error)
        this.detail = null;
      }
    )
  }

}
