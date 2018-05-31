import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from '../../models/product';
import 'rxjs/operator/take';
import 'rxjs/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();

    const item$ = this.getCartItem(cartId, product.key);

    item$.valueChanges()
      .take(1) // to don't have deal with unsubscribe
      .subscribe(item => {
        console.log(item);
        const qty = (item) ? item.quantity : 0;
        item$.update({product: product, quantity: qty + 1});
      });
  }

  create() {
    return this.db.list('shopping-carts')
      .push({dataCreated: new Date().getTime()});
  }

  private getCartItem(cartId, productId: string) {
    return this.db.object('shopping-carts/' + cartId + '/items/' + productId);
  }

  private getCart(cartId: string) {
    this.db.object('shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

}
