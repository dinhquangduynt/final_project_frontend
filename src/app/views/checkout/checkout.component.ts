import { CheckoutService } from './checkout.service';
import { ProductService } from './../products/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  isShow = false;
  tinh = []
  huyen=[]
  xa = []
  dataOrder = {
    id: '',
    paymentMethod: '',
    paymentStatus: '0',
    totalPrice: 0,
    customerName: '',
    customerAddress: '',
    customerEmail: '',
    customerPhone: '',
    customerMassage: '',
    status: false,
    orderDetails: []
  }

  listData = [];
  listDataLocalStorage:any
  isClickShioCOD = true;
  isClickPaypal = false;
  constructor(private productService: ProductService, private router: Router, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.listDataLocalStorage = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : '';
    this.dataOrder.totalPrice = this.listDataLocalStorage.totalPrice;
    this.dataOrder.orderDetails = this.listDataLocalStorage.orderDetails

  }

  selectCheckBox(){
    this.isShow = !this.isShow
  }

  addOrder(){
    const data = {
      paymentMethod: this.dataOrder.paymentMethod,
    paymentStatus: this.dataOrder.paymentStatus,
    totalPrice: this.dataOrder.totalPrice,
    customerName: this.dataOrder.customerName,
    customerAddress: this.dataOrder.customerAddress,
    customerEmail: this.dataOrder.customerEmail,
    customerPhone: this.dataOrder.customerPhone,
    customerMassage: this.dataOrder.customerMassage,
    status: false,
    orderDetails: this.dataOrder.orderDetails
    }
    this.dataOrder.orderDetails.forEach(res =>{
      delete res['name']
    })
    Swal.fire({
      title: 'Bạn có chắc chắn muốn gửi email này không?',
      text: "Bạn sẽ không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Gửi'
    }).then((result) => {
      if (result.isConfirmed) {
        this.checkoutService.addOrder(this.dataOrder).subscribe(
          (res: any) => {
            Swal.fire(
              'Đã gửi',
              'Email của bạn đã được gửi',
              'success'
            ).then((result) =>{
              if (result.isConfirmed){
                localStorage.removeItem('order');
                localStorage.removeItem('cart');
                this.router.navigateByUrl("/")
              }           
            })
            
          },
          err => {
            console.log(err)
          }
        )
      }
    })

    // this.checkoutService.addOrder(this.dataOrder).subscribe(res => {
    //   localStorage.removeItem('order');
    //   localStorage.removeItem('cart');
    //   // this.router.navigateByUrl("/")

    // }, err => {
    //   console.log(err);

    // })
  }
}
