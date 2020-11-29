import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  public Editor = ClassicEditor;
  listProduct;
  dataProduct = {


    alias: '',
categoryId: '',
content: '',
createBy: '',
create_date: '',
description: '',
homeFlg: '',
hotFlg: '',
id: '',
images: '',
name: '',
price: '',
quantity: '',
rating: '',
status: '',
updateBy: '',
update_date: '',
viewCount: '',
warranty: ''
  };
  files = [];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productService.getAll().subscribe(
      (res: any) => {
        this.listProduct = res.data;
      },
      error => {
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
        this.dataProduct = res.data;
      },
      error =>{
        console.log(error)
      }
    )
  }
  deleteProduct(productId){
    this.productService.deleteProduct(productId).subscribe(
      (res: any)=>{
        return this.listProduct;
      },
      error =>{
        console.log(error)
      }
    )
  }
  save(){
    this.productService.add(this.dataProduct,this.files).subscribe(res =>{
      this.getData();
    })
  }

  addNew(){

  }

  onChangeFile() {
    for(const file of this.fileInput.nativeElement.files ){
      this.files.push(file);
    }
  }


}
