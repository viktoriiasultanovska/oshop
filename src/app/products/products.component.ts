import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product/product.service';
import {CategoryService} from '../service/category/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;
  categories$;

  constructor(protected productService: ProductService, protected categoryService: CategoryService) {
    this.productService.getAll()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
      .subscribe(products => {
        this.products$ = products;
      });

    this.categoryService.getAll()
      .map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
      .subscribe(categories => {
        console.log(categories);
        this.categories$ = categories;
      });
  }

  ngOnInit() {
  }

}
