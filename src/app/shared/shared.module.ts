import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from 'shared/components/product-card/product-card.component';
import {ProductQuantityComponent} from 'shared/components/product-quantity/product-quantity.component';
import {CategoryService} from 'shared/services/category/category.service';
import {OrderService} from 'shared/services/order/order.service';
import {AuthService} from 'shared/services/auth/auth.service';
import {UserService} from 'shared/services/user/user.service';
import {ProductService} from 'shared/services/product/product.service';
import {ShoppingCartService} from 'shared/services/shopping-cart/shopping-cart.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule {
}
