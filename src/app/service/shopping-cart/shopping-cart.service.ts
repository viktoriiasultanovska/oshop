import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from 'app/shared/models/product';
import 'rxjs/operator/take';
import 'rxjs/operator/map';
import {ShoppingCart} from 'app/shared/models/shopping-cart';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    const y$: Observable<any> = this.db.object('shopping-carts/' + cartId)
      .valueChanges();
    return y$.map(x => new ShoppingCart(x.items));
  }

  addToCart(product: Product) {
    this.updateItem(product, +1);
  }

  removeFromCart(product: Product) {
    console.log(product);
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('shopping-carts/' + cartId + '/items')
      .remove();
  }

  create() {
    return this.db.list('shopping-carts')
      .push({dateCreated: new Date().getTime()});
  }

  private getCartItem(cartId, productId: string): any {
    return this.db.object('shopping-carts/' + cartId + '/items/' + productId);
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

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();

    let item$ = this.getCartItem(cartId, product.key);

    item$.valueChanges()
      .take(1) // to don't have deal with unsubscribe
      .subscribe(item => {
        const qty = (item) ? item.quantity : 0;
        const quantity = qty + change;
        if (quantity === 0) {
          item$.remove();
        } else {
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: quantity
          });
        }
      });
  }

}
