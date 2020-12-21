import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CateProductsComponent } from './cate-products/cate-products.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ContactManagementComponent } from './contact-management/contact-management.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AdminComponent, ProductsComponent, OrderManagementComponent, StatisticsComponent, HomeComponent, HeaderComponent, SidebarComponent, CateProductsComponent, AccountManagementComponent, ContactManagementComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbDropdownModule,
    NgbCarouselModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot()
  ]
})
export class AdminModule { }
