import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../service/product/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';
import {ShoppingCartService} from '../service/shopping-cart/shopping-cart.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  /**
   * @param {ActivatedRoute} route
   * @param {ProductService} productService
   */
  constructor(
    protected route: ActivatedRoute,
    protected productService: ProductService,
    protected shoppingCartService: ShoppingCartService
  ) {
    // Use switchMap to switch one observable to another
    this.productService.getAll()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap; // Second observable
      }).subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) : this.products;
    });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .valueChanges()
      .subscribe(cart => {
        console.log(cart);
        this.cart = cart;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
