import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 
import { error } from 'protractor';
import { ProductsService } from '../services/products.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public Editor = ClassicEditor; 
  listProduct: any;
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
     this.productService.getAll().subscribe(
      (res : any) =>{
        this.listProduct = res.data;
      },
      error => {
        console.log(error)
      }
    ),
    $(document).ready(function () {
      $(".btn-add").on("click", function(){
        $(".container-right").css({
          display:'block'
        });
        $(".container").css({
          display:'flex'
        })
      })
    })
  }
  detailProduct(productId){
    this.productService.getByProductId(productId).subscribe(
      (res: any)=>{
        console.log(res.data)
      },
      error =>{
        console.log(error)
      }
    )
  }
  deleteProduct(productId){
    this.productService.deleteProduct(productId).subscribe(
      (res: any)=>{
        console.log("done")
        return this.listProduct;
      },
      error =>{
        console.log(error)
      }
    )
  }
}
