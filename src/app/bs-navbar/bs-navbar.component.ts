import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../service/auth/auth.service';
import {AppUser} from '../models/app-user';
import {ShoppingCartService} from '../service/shopping-cart/shopping-cart.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemQty: number;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);

  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    (await this.shoppingCartService.getCart())
      .valueChanges()
      .subscribe(cart => {
        console.log(cart);
        this.shoppingCartItemQty = 0;
        for (const productId in cart.items) {
          this.shoppingCartItemQty += cart.items[productId].quantity;
        }
      });
  }

}
