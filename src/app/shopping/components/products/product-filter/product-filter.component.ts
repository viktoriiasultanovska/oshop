import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from 'shared/services/category/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$ = [];
  @Input('category') category;

  constructor(protected categoryService: CategoryService) {
    this.categoryService.getAll()
      .map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
      .subscribe(categories => {
        this.categories$ = categories;
        this.categories$ = this.addAllCategoriesLink(this.categories$);
      });
  }

  /**
   * @param categories
   * @returns {*}
   */
  private addAllCategoriesLink(categories = []) {
    return Object.assign(categories, {0: {key: 0, name: 'All categories'}});
  }

  ngOnInit() {
  }

}
