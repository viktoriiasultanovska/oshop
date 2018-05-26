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
  id;

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

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.get(this.id)
        .take(1)
        .subscribe(product => {
          this.product = product;
        });
    }
  }

  save(product) {
    if (this.id) {
      // Update product
      this.productService.update(this.id, this.product);
    } else {
      // Create new one
      this.productService.create(product);
    }

    this.router.navigate(['admin/products']);
  }

  ngOnInit() {

  }

}
