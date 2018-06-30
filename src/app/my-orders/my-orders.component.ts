import {Component, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {AuthService} from 'app/shared/services/auth/auth.service';
import {OrderService} from 'app/shared/services/order/order.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnDestroy {
  orders;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {

    this.subscription = authService.user$
      .subscribe(u => {
        let orders: Observable<any> = orderService.getOrdersByUser(u.uid).snapshotChanges();
        this.orders = orders
          .map(actions => {
             return actions.map(a => {
               const data = a.payload.val();
               const id = a.payload.key;
               return { orderId: id, ...data };
             });
           });
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
