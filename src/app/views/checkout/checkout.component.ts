import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  isShow = false;
  constructor() { }

  ngOnInit(): void {
  }

  selectCheckBox(){
    this.isShow = !this.isShow
  }
}
