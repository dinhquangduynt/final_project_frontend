import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public Editor = ClassicEditor; 
  listProduct;
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      (res : any) =>{
        console.log(res.data)
      },
      error => {
        console.log(error)
      }
    )
  }
}
