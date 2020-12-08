import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { error } from 'protractor';
import { OrderDetailService } from '../services/order-detail.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public sliders: Array<any> = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColors: Color[] = [
    { backgroundColor: 'blue' }
  ]

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Doanh thu' }
  ];
  constructor(private orderService: OrderService, private orderDetailService: OrderDetailService) { 
    this.sliders.push(
      {
          imagePath: 'assets/img/slider/1.jpg',
          label: 'First slide label',
          text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
      },
      {
          imagePath: 'assets/img/slider/2.jpg',
          label: 'Second slide label',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
          imagePath: 'assets/img/slider/3.jpg',
          label: 'Third slide label',
          text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
      }
  );
  }

  ngOnInit(): void {
  }
  orderToday = [];
  totalPriceToDay=0;
  quantityOrderToday = 0;
  quantityProductToDay = 0;
  listOrderDetailToDay = [];
  getAllOrder(){
    this.orderService.getAll().subscribe(
      (res:any)=>{
        const nowDay = new Date();
        res.data.forEach(e => {
          if (e.createDate = nowDay) {
            this.totalPriceToDay = this.totalPriceToDay + e.totalPrice;
            this.orderToday.push(e);
          }
        });
        this.quantityOrderToday = this.orderToday.length;
        for (let i = 0; i < this.orderToday.length; i++) {
          this.orderDetailService.getByOrderId(this.orderToday[i].id).subscribe(
            (res:any)=>{
              this.quantityProductToDay = this.quantityProductToDay + res.quantiy;
            },
            error=>{
              console.log(error)
            }
          )
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
  addNew(){

  }
}
