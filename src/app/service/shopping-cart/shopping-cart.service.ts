import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  addToCart(product) {

  }

  create() {
    return this.db.list('shopping-carts')
      .push({dataCreated: new Date().getTime()});
  }

  private getCart(cartId: string) {
    this.db.object('shopping-carts/' + cartId);
  }

  private async getOrCreateCart() {
    const cartId = localStorage.getItem('cartId');

    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return this.getCart(result.key);
    }
    return this.getCart(cartId);
  }

}
