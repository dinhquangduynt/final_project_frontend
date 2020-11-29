import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CateProductsComponent } from './cate-products/cate-products.component';
import { HomeComponent } from './home/home.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { ProductsComponent } from './products/products.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [{ path: '', component: AdminComponent,
  children : [
    { path: 'home', component: HomeComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'statistics', component: StatisticsComponent},
    { path: 'order', component: OrderManagementComponent},
    { path: 'cateProducts', component: CateProductsComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
