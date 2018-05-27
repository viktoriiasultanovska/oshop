import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {Subscription} from 'rxjs/Subscription';
import {Product} from '../../models/product';
import {DataTableResource} from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  productsResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount = 0;

  constructor(private productService: ProductService) {
    this.rowColors = this.rowColors.bind(this);
    // Use snapshotChanges().map() to store the key
    this.subscription = this.productService.getAll()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Product[]) {
    this.productsResource = new DataTableResource(products);
    this.productsResource.query({offset: 0})
      .then(items => this.items = items);
    this.productsResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.productsResource) {
      return;
    }
    this.productsResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    query = query.trim(); // Remove whitespace
    query = query.toLowerCase(); // To lowercase matches
    const filteredProducts = (query) ?
      this.products.filter(product => product.title.toLowerCase().includes(query)) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  rowColors(product) {
    if (product.category === 'bread') { return 'rgb(255, 255, 197)'; }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
