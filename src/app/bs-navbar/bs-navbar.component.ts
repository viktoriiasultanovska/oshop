import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from 'app/shared/services/auth/auth.service';
import {AppUser} from 'app/shared/models/app-user';
import {ShoppingCartService} from 'app/shared/services/shopping-cart/shopping-cart.service';
import {ShoppingCart} from 'app/shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);

  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
  }

}
