import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from '../../models/product';
import 'rxjs/operator/take';
import 'rxjs/operator/map';
import {ShoppingCart} from '../../models/shopping-cart';
import {AngularFireObject} from 'angularfire2/database/interfaces';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product, +1);
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  create() {
    return this.db.list('shopping-carts')
      .push({dateCreated: new Date().getTime()});
  }

  private getCartItem(cartId, productId: string): any {
    return this.db.object('shopping-carts/' + cartId + '/items/' + productId);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    const y$: Observable<any> = this.db.object('shopping-carts/' + cartId)
      .valueChanges();
    return y$.map(x => new ShoppingCart(x.items));
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      return cartId;
    }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();

    const item$ = this.getCartItem(cartId, product.key);

    item$.valueChanges()
      .take(1) // to don't have deal with unsubscribe
      .subscribe(item => {
        const qty = (item) ? item.quantity : 0;
        if (qty + change === 0) {
          item$.remove({product: product});
        } else {
          item$.update({product: product, quantity: qty + change});
        }
      });
  }

}
