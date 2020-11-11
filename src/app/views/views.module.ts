import { FormsModule } from '@angular/forms';
import { ViewsRoutingModule } from './views-routing.module';
import { FooterComponent } from './../themes/footer/footer.component';
import { HeaderComponent } from './../themes/header/header.component';
import { ViewsComponent } from './views.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    ViewsComponent,
    SignInComponent,
    SignUpComponent,

    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    HomeComponent,
    ProductDetailComponent,
    CartComponent,
    ContactComponent,
    AboutUsComponent,
    CheckoutComponent],

  imports: [
    CommonModule,
    ViewsRoutingModule,
    FormsModule,
  ]
})
export class ViewsModule { }
