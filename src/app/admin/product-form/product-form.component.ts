import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category/category.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {

  categories: Observable<any[]>;

  constructor(private categoryService: CategoryService, private db: AngularFireDatabase) {
    this.categories = this.categoryService.getCategories()
      .map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      });


  }

  ngOnInit() {

  }

}
