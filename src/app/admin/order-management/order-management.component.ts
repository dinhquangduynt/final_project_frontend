import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import Swal from 'sweetalert2';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  listOrder = [];
  searchText;
  searchText2;
  listOrderChecked = [];
  detail;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.orderService.getAll().subscribe(
      (res:any)=>{
        res.data.forEach(e => {
          if(!e.status) {
            this.listOrder.push(e);
          }
          else{
            this.listOrderChecked.push(e);
          }
        });
      },
      error=>{
        console.log(error)
      }
    )
  }
  updateStatus(id){
    this.orderService.getById(id).subscribe(
      (res:any)=>{
        this.detail = res.data;
      },
      error=>{

      }
    )
    Swal.fire({
      title: 'Đơn hàng sẽ được đánh dấu là đã giao?',
      text: "Bạn sẽ không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cập nhật!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.orderService.updateOrder(this.detail).subscribe(
            (res:any)=>{
              Swal.fire(
                'Hoàn thành!',
                'Cập nhật đơn hàng thành công.',
                'success'
              )
              this.listOrder = [];
              this.listOrderChecked = [];
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
          'Đơn hàng chưa giao',
          'error'
        )
      }
    })
  }
  delete(id){

  }
}
