import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category/category.service';
import {Observable} from 'rxjs/Observable';
import {ProductService} from '../../service/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {

  categories: Observable<any[]>;

  constructor(private categoryService: CategoryService, private productService: ProductService) {
    this.categories = this.categoryService.getCategories()
      .map(categories => {
        return categories.map(category => ({key: category.payload.key, ...category.payload.val()}));
      });


  }

  save(product) {
    this.productService.create(product);
  }

  ngOnInit() {

  }

}
