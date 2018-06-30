import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {AuthService} from '../service/auth/auth.service';
import {OrderService} from '../service/order/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {

    authService.user$
      .subscribe(u => {
        this.orders$ =  orderService.getOrdersByUser(u.uid)
          .snapshotChanges()
          .map(changes => {
            return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
          });
      });
  }
}
