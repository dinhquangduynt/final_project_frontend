import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  files = [];
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
  constructor(private cateService: CateProductsService) { }
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.cateService.getAll().subscribe(
      (res:any)=>{
        this.listCate = res.data
      },
      err=>{
        console.log(err)
      }
    )
  }
  addCate(){
    this.cateService.addCateProduct(this.dataCate, this.files).subscribe(
      (res:any)=>{
        alert("add success");
        $('#modalAdd').modal('hide');
        this.getAll();
      },
      err=>{

      }
    )
  }
  update(){
    this.cateService.update(this.dataCate, this.files).subscribe(
      (res:any)=>{
        alert("update success");
        $('#modalEdit').modal('hide');
        this.getAll();
      },
      err=>{

      }
    )
  }
  onChangeFile() {
    for (const file of this.fileInput.nativeElement.files) {
      this.files.push(file);
    }
  }
}
