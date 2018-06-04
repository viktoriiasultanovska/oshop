import {ShoppingCartItem} from './shopping-cart-item';
import {Product} from './product';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    for (const productId in itemsMap) {
      const item = itemsMap[productId];
      const shoppingCartItem = new ShoppingCartItem();
      Object.assign(shoppingCartItem, item); // Copy all the properties from item (firebase object) to shoppingCartItem
      shoppingCartItem.key = productId;
      this.items.push(shoppingCartItem);
    }
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items)
      sum += this.items[productId].totalPrice;
    return sum;
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
}
