import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category/category.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {

  categories: any[] = [];

  constructor(private categoryService: CategoryService, private db: AngularFireDatabase) {
    this.categoryService.getCategories()
      .map(action => {
        return action.payload.toJSON();
      }).subscribe(result => {
      Object.keys(result).map(key => {
        this.categories.push({'key': key, 'data': result[key]});
      });
    });


  }

  ngOnInit() {

  }

}
