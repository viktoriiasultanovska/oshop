import {Component, OnInit} from '@angular/core';
import {ProductService} from 'shared/services/product/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from 'shared/models/product';
import {ShoppingCartService} from 'shared/services/shopping-cart/shopping-cart.service';
import {Observable} from 'rxjs/Observable';
import {ShoppingCart} from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  /**
   * @param {ActivatedRoute} route
   * @param {ProductService} productService
   */
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

  }

  async ngOnInit() {
    this.populateProducts();

    this.cart$ = await this.shoppingCartService.getCart();
  }

  protected populateProducts() {
    // Use switchMap to switch one observable to another
    this.productService.getAll()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap; // Second observable
      }).subscribe(params => {
      this.category = params.get('category');

      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) : this.products;
  }

}
