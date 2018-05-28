import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product/product.service';
import {CategoryService} from '../service/category/category.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  /**
   * @param {ActivatedRoute} route
   * @param {ProductService} productService
   * @param {CategoryService} categoryService
   */
  constructor(
    protected route: ActivatedRoute,
    protected productService: ProductService,
    protected categoryService: CategoryService
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

    this.categoryService.getAll()
      .map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
      .subscribe(categories => {
        this.categories$ = categories;
      });


  }

  ngOnInit() {
  }

}
