import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category/category.service';
import {Observable} from 'rxjs/Observable';
import {ProductService} from '../../service/product/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {

  categories: Observable<any[]>;
  product = {};

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories = this.categoryService.getCategories()
      .map(categories => {
        return categories.map(category => ({key: category.payload.key, ...category.payload.val()}));
      });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.get(id)
        .take(1)
        .subscribe(product => {
          this.product = product;
        });
    }
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['admin/products']);
  }

  ngOnInit() {

  }

}
