import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions = true;

  constructor() { }

}
