import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../service/order/order.service';
import {ShoppingCartService} from '../service/shopping-cart/shopping-cart.service';
import {ShoppingCart} from '../models/shopping-cart';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth/auth.service';
import {Order} from '../models/order';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping: any = {};
  @Input('cart') cart: ShoppingCart;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {
  }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
