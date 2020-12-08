import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label,Color } from 'ng2-charts';
import { error } from 'protractor';
import { CateProductsService } from '../services/cate-products.service';
import { OrderService } from '../services/order.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] ;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColors: Color[] = [
    { backgroundColor: 'blue' }
  ]
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Thống kê theo danh mục' }
  ];
  constructor(private productService: ProductsService,private cateProductService:CateProductsService,private orderService: OrderService) {}
  listcate;
  listproductbycate;
  listorder
  ngOnInit(): void {
    this.getAllcate();
    this.getAllProduct();
  }
  getAllProduct(){
    this.productService.getAll().subscribe(
      (res:any)=>{

      },
      error=>{
        
      }
    )
  }
  getAllcate(){
    this.cateProductService.getAll().subscribe(
      (res:any)=>{
        res.data.forEach(e => {
          this.productService.getByCateId(e.id).subscribe(
            (res:any)=>{
              // this.listproductbycate = res.data;
              // console.log(res.data)
              for (let index = 0; index < res.data.length; index++) {
                this.orderService.getById(res.data[index].id).subscribe(
                  (res:any)=>{
                    console.log(res.data)
                  },
                  error=>{
                    
                  }
                )
              }
            },
            error=>{

            }
          )
        });
      },
      error=>{
        console.log(error)
      }
    )
  }
}
