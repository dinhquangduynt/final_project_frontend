import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  listOrder;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.orderService.getAll().subscribe(
      (res:any)=>{
        this.listOrder = res.data;
      },
      error=>{
        console.log(error)
      }
    )
  }
}
