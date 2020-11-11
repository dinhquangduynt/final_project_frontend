import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ViewsComponent } from './views.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';


const routes: Routes = [
  {
    path: '', component: ViewsComponent,
    children: [
      {path: '', component: HomeComponent},
      { path: 'login', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'product-detail', component: ProductDetailComponent },
       { path: 'cart', component: CartComponent },
       { path: 'about', component: AboutUsComponent },
       { path: 'contact', component: ContactComponent },
       { path: 'checkout', component: CheckoutComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
