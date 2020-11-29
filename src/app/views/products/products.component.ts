import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  listProduct: any;
  cateId: any;
  params:any;

  priceFilter = 100;
  constructor( private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.params = this.activatedRoute.params.subscribe(params => {
      this.cateId = params['cateId'];
      this.productService.getAllProductbyCateId(this.cateId).subscribe(
        (res: any)=>{
          this.listProduct = res.data;
        },
        error=>{
          console.log(error)
        }
      )
    })
  }

}
