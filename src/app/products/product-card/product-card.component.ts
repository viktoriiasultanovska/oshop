import {Component, Input} from '@angular/core';
import {ShoppingCartService} from '../../service/shopping-cart/shopping-cart.service';
import {ShoppingCart} from 'app/shared/models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

}
