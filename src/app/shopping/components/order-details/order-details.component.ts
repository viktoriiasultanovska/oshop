import {Component, OnInit} from '@angular/core';
import {OrderService} from 'app/shared/services/order/order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: any = {};
  orderId: string;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderByKey(this.orderId)
      .valueChanges()
      .take(1)
      .subscribe(order => {
        this.order = order;
      });
  }

  ngOnInit() {
  }

}
