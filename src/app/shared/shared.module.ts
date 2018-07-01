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
import {FormsModule} from '@angular/forms';
import {DataTableModule} from 'angular5-data-table';
import {CustomFormsModule} from 'ng2-validation';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    DataTableModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule,

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
