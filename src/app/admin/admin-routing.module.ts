import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from '../views/contact/contact.component';
import { AccountManagementComponent } from './account-management/account-management.component';

import { AdminComponent } from './admin.component';
import { CateProductsComponent } from './cate-products/cate-products.component';
import { ContactManagementComponent } from './contact-management/contact-management.component';
import { HomeComponent } from './home/home.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { ProductsComponent } from './products/products.component';
import { AccountManagementService } from './services/account-management.service';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [{ path: '', component: AdminComponent,
  children : [
    { path: 'home', component: HomeComponent},
    { path: ':cateId/product', component: ProductsComponent},
    { path: 'statistics', component: StatisticsComponent},
    { path: 'order', component: OrderManagementComponent},
    { path: 'cateProducts', component: CateProductsComponent},
    { path: 'customer', component:AccountManagementComponent},
    { path: 'contact', component: ContactManagementComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
