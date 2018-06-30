import {environment} from './../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from 'app/app.component';
import {BsNavbarComponent} from 'app/core/components/bs-navbar/bs-navbar.component';
import {HomeComponent} from 'app/core/components/home/home.component';
import {ProductsComponent} from 'app/shopping/components/products/products.component';
import {ShoppingCartComponent} from 'app/shopping/components/shopping-cart/shopping-cart.component';
import {CheckOutComponent} from 'app/shopping/components/check-out/check-out.component';
import {OrderSuccessComponent} from 'app/shopping/components/order-success/order-success.component';
import {MyOrdersComponent} from 'app/shopping/components/my-orders/my-orders.component';
import {AdminProductsComponent} from 'app/admin/components/admin-products/admin-products.component';
import {AdminOrdersComponent} from 'app/admin/components/admin-orders/admin-orders.component';
import {LoginComponent} from 'app/core/components/login/login.component';
import {AuthService} from 'app/shared/services/auth/auth.service';
import {AuthGuard} from 'app/shared/services/auth-guard/auth-guard.service';
import {UserService} from 'app/shared/services/user/user.service';
import {AdminAuthGuard} from 'app/admin/services/admin-auth-guard/admin-auth-guard.service';
import {ProductFormComponent} from 'app/admin/components/product-form/product-form.component';
import {CategoryService} from 'app/shared/services/category/category.service';
import {FormsModule} from '@angular/forms';
import {ProductService} from 'app/shared/services/product/product.service';
import {CustomFormsModule} from 'ng2-validation';
import {DataTableModule} from 'angular5-data-table';
import {ProductFilterComponent} from 'app/shopping/components/products/product-filter/product-filter.component';
import {ProductCardComponent} from 'app/shared/components/product-card/product-card.component';
import {ShoppingCartService} from 'app/shared/services/shopping-cart/shopping-cart.service';
import {ProductQuantityComponent} from 'app/shared/components/product-quantity/product-quantity.component';
import {OrderService} from 'app/shared/services/order/order.service';
import {ShoppingCartSummaryComponent} from 'app/shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import {ShippingFormComponent} from 'app/shopping/components/shipping-form/shipping-form.component';
import {OrderDetailsComponent} from 'app/shopping/components/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    DataTableModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'login', component: LoginComponent},
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'order-success/:id', component: OrderSuccessComponent},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      {path: 'my/orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ])
  ],
  providers: [AuthService, AuthGuard, UserService, AdminAuthGuard, CategoryService, ProductService, ShoppingCartService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
