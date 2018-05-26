import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product) {
    return this.db.list('products')
      .push(product);
  }

  getAll(): Observable<any> {
    return this.db.list('products')
      .snapshotChanges();
  }

  get(id) {
    return this.db.object('/products/' + id)
      .valueChanges();
  }

}
