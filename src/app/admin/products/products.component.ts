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
  isEdit = false;
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
    )
  }
  detailProduct(productId) {
    this.productService.getByProductId(productId).subscribe(
      (res: any) => {
        console.log(res.data)
        this.dataProduct = res.data;
      },
      error => {
        console.log(error)
      }
    )
  }
  deleteProduct(productId) {
    this.productService.deleteProduct(productId).subscribe(
      (res: any) => {
        return this.listProduct;
      },
      error => {
        console.log(error)
      }
    )
  }
  save() {
    if(this.isEdit){
      this.productService.updateProduct(this.dataProduct, this.files).subscribe(res => {
        this.getData();
        $('.modal').modal('hide');
      }, err => {

      })
    } else {
      this.productService.addProduct(this.dataProduct, this.files).subscribe(res => {
        this.getData();
        $('.modal').modal('hide');
      }, err => {

      })
    }

  }

  addNew() {
    this.isEdit = false;
    this.resetData();
  }

  onChangeFile() {
    for (const file of this.fileInput.nativeElement.files) {
      this.files.push(file);
    }
  }

  resetData(){
    this.dataProduct = {
      alias: '',
      categoryId: '1',
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
  }
}
