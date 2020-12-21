import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { error } from 'protractor';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
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
  searchText;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService, private toastr: ToastrService) { }

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
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa không?',
      text: "Bạn sẽ không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(
            (res:any)=>{
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.getByCateId()
            },
            err=>{
              console.log(err)
            }
          )
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Type product is safe',
          'error'
        )
      }
    })
  }
  save() {
    if(this.isEdit){
      this.productService.updateProduct(this.dataProduct, this.files).subscribe(res => {
        this.toastr.success('Cập nhật thành công')
        this.getByCateId()
        $('#modalEdit').modal('hide');
      }, err => {

      })
    } else {
      this.productService.addProduct(this.dataProduct, this.files).subscribe(res => {
        this.toastr.success('Thêm thành công')
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
