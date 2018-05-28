import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;

  constructor(protected categoryService: CategoryService) {
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