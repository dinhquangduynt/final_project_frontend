import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { error } from 'protractor';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
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
  cateId: any;
  params:any;
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
    name: '',
    newPrice: '',
    oldPrice:'',
    quantity: '',
    rating: '',
    status: '',
    updateBy: '',
    update_date: '',
    viewCount: '',
    warranty: '',
  };
  files = [];
  isEdit = false;
  productId:any;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    this.getByCateId();
  }
  getByCateId(){
    this.params = this.activatedRoute.params.subscribe(params => {
      this.cateId = params['cateId'];
      this.productService.getByCateId(this.cateId).subscribe(
        (res: any) => {

          this.listProduct = res.data.products;
        },
        error => {
        }
      )
    })
  }
  detailProduct(productId: any) {
    this.productService.getByProductId(productId).subscribe(
      (res: any) => {
        console.log(res);
        this.dataProduct = res.data.product;
      },
      error => {
        console.log(error)
      }
    )
  }
  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      (res: any) => {
        alert("thành công");
        // return this.listProduct;
        this.getByCateId();
      },
      error => {
        console.log(error)
      }
    )
  }
  save() {
    if(this.isEdit){
      this.productService.updateProduct(this.dataProduct, this.files).subscribe(res => {
        this.getByCateId()
        $('#modalEdit').modal('hide');
      }, err => {

      })
    } else {
      this.productService.addProduct(this.dataProduct, this.files).subscribe(res => {
        this.getByCateId()
        $('#modalEdit').modal('hide');
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
      categoryId: this.cateId,
      content: '',
      createBy: '',
      create_date: '',
      description: '',
      homeFlg: '',
      hotFlg: '',
      id: '',
      name: '',
      newPrice: '',
      oldPrice: '',
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
