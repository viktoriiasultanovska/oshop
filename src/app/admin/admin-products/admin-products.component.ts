import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {Subscription} from 'rxjs/Subscription';
import {Product} from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    // Use snapshotChanges().map() to store the key
    this.productService.getAll()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
      .subscribe(products => {
        this.filteredProducts = this.products = products;
      });
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
