import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CateProductsService } from '../services/cate-products.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-cate-products',
  templateUrl: './cate-products.component.html',
  styleUrls: ['./cate-products.component.css']
})
export class CateProductsComponent implements OnInit {
  listCate: any;
  cateId: any;
  files = [];
  searchText;
  dataCate = {
    createBy: '',
    updateBy: '',
    id: '',
    name: '',
    alias: '',
    images: '',
    description: '',
    status: '',
    create_date: '',
    update_date: ''
  }

  constructor(private cateService: CateProductsService, private toastr: ToastrService) { }
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.cateService.getAll().subscribe(
      (res: any) => {
        this.listCate = res.data;
      },
      err => {
        console.log(err);
      }
    )
  }
  detail(cateId: any) {
    this.cateService.getById(cateId).subscribe(
      (res: any) => {
        this.files = []
        this.dataCate = res.data;
      },
      err => {

      }
    )
  }
  addnew() {
    this.reset();
  }
  reset() {
    this.dataCate = {
      createBy: '',
      updateBy: '',
      id: '',
      name: '',
      alias: '',
      images: '',
      description: '',
      status: '',
      create_date: '',
      update_date: ''
    }
  }
  addCate() {
    this.cateService.addCateProduct(this.dataCate, this.files).subscribe(
      (res: any) => {
        
        $('#modalAdd').modal('hide');
        this.toastr.success("Thêm thành công")
        this.getAll();
      },
      err => {

      }
    )
  }
  update() {
    this.cateService.update(this.dataCate, this.files).subscribe(
      (res: any) => {
        this.toastr.success("Cập nhật thành công")
        $('#modalEdit').modal('hide');
        this.getAll();
      },
      err => {

      }
    )
  }
  onChangeFile() {
    for (const file of this.fileInput.nativeElement.files) {
      this.files.push(file);
    }
  }
  delete(cateId: string) {
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
        this.cateService.delete(cateId).subscribe(
            (res:any)=>{
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.getAll()
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
}
