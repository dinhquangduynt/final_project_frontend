import { ViewsRoutingModule } from './views-routing.module';
import { FooterComponent } from './../themes/footer/footer.component';
import { HeaderComponent } from './../themes/header/header.component';
import { ViewsComponent } from './views.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    ViewsComponent,
    SignInComponent,
    SignUpComponent,

    HeaderComponent,
    FooterComponent,
    ProductsComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule
  ]
})
export class ViewsModule { }
