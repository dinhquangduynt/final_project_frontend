import { JwPaginationComponent } from 'jw-angular-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewsRoutingModule } from './views-routing.module';
import { FooterComponent } from './../themes/footer/footer.component';
import { HeaderComponent } from './../themes/header/header.component';
import { ViewsComponent } from './views.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ViewsComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    HomeComponent,
    ProductDetailComponent,
    CartComponent,
    ContactComponent,
    AboutUsComponent,
    CheckoutComponent,
  ],

  imports: [
    CommonModule,
    ViewsRoutingModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ViewsModule { }
