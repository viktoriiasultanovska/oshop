import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {

  categories;
  categoryCodes;

  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.categoryCodes = Object.keys(categories);
      });
  }

  ngOnInit() {

  }

}
