import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../service/shopping-cart/shopping-cart.service';
import {ShoppingCart} from '../models/shopping-cart';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../service/order/order.service';
import {AuthService} from '../service/auth/auth.service';
import {Order} from '../models/order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping: any = {};
  cart: ShoppingCart;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    protected shoppingCartService: ShoppingCartService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => this.cart = cart);
    this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
