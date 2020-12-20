import { ProductService } from './../products/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products = [];
  listData = [];
  listDataLocalStorage = [];
  listId;
  total = 0;
  count;
  price_item;
  // index;
  quantityInput;
  isDisable = false;

  cartTotalotalPrice = 0;

  cart = {
    cartDetails: [],
    cartTotal: 0
  }
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.listDataLocalStorage = this.listId = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    this.productService.getAll().subscribe((res: any) => {
      let index = 0;
      res.data.products.forEach(element => {
        if (this.listDataLocalStorage.find(rs => rs.id == element.id)) {
          this.cart.cartDetails.push({...element});
          this.cart.cartDetails[index][`totalPrice`] = element.newPrice * parseInt(this.listDataLocalStorage.find(rs => rs.id == element.id).quantity);
          this.cart.cartDetails[index][`quantityInput`] = parseInt(this.listDataLocalStorage.find(rs => rs.id == element.id).quantity);
          this.cart.cartTotal += element.newPrice * parseInt(this.listDataLocalStorage.find(rs => rs.id == element.id).quantity)
          index++;
        }
      });
    })
  }
  QuantityChange
  onchangeQuantity(id){
    this.cart.cartTotal = 0;
    this.cart.cartDetails.forEach(res => {
      if(res.id === id){
        res.totalPrice = res.quantityInput * res.newPrice;
      }
      this.cart.cartTotal+= res.totalPrice;
    })
  }

  removeItem(id){
    this.cart.cartDetails.forEach(res => {
      if(res.id === id){
        res.totalPrice = res.quantityInput * res.newPrice;
        this.cart.cartTotal -= res.totalPrice;
      }
    });
    let index =  this.cart.cartDetails.findIndex(res => res.id === id);
    this.cart.cartDetails.splice(index, 1);
    let indexLocal =  this.listDataLocalStorage.findIndex(res => res.id === id);
    this.listDataLocalStorage.splice(index,1)
    localStorage.setItem('cart',JSON.stringify(this.listDataLocalStorage));
  }

  onSubmit(){
    this.router.navigateByUrl("/checkout", {queryParams: this.cart})
    const dataOrder = {
      totalPrice: this.cart.cartTotal,
      orderDetails: []
    }
    this.cart.cartDetails.forEach(res => {
      dataOrder.orderDetails.push({
        productId: res.id,
        quantity: res.quantity,
        pricePerItem: res.newPrice,
        totalPrice: res.totalPrice,
        name: res.name
      })
    })
    localStorage.setItem('order',JSON.stringify(dataOrder));
  }
}
