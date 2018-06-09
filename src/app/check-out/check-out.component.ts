import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../service/shopping-cart/shopping-cart.service';
import {ShoppingCart} from '../models/shopping-cart';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../service/order/order.service';
import {AuthService} from '../service/auth/auth.service';

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
    private authService: AuthService,
    protected shoppingCartService: ShoppingCartService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => this.cart = cart);
    this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  placeOrder() {
    const order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      products: this.cart.items.map(i => {
        return {
          product: {
            key: i.key,
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        };
      })
    };
    this.orderService.storeOrder(order);
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
