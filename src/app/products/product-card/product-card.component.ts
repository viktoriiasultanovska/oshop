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
    this.shoppingCartService.addToCart(product);
  }

}
