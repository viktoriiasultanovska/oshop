import {Component, Input} from '@angular/core';
import {Product} from '../../models/product';
import {ShoppingCartService} from '../../service/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions = true;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  addToCart(product: Product) {
    console.log(product);
    const cartId = localStorage.getItem('cartId');
    console.log(cartId);
    if (!cartId) {
      this.shoppingCartService.create()
        .then(result => {
          localStorage.setItem('cartId', result.key);

          // Add product to cart
        });
    } else {
      // Add product to cart
    }
  }

}
