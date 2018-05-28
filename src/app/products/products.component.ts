import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;

  constructor(protected productService: ProductService) {
    this.productService.getAll()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
      .subscribe(products => {
        this.products$ = products;
      });
  }

  ngOnInit() {
  }

}
