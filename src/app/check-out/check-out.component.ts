import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../service/shopping-cart/shopping-cart.service';
import {ShoppingCart} from 'app/shared/models/shopping-cart';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(
    protected shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
