import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) {
  }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list('orders', ref => ref.orderByChild('userId').equalTo(userId))
      ;
  }

  getOrderByKey(key: string) {
    return this.db.object('orders/' + key);
  }

}
