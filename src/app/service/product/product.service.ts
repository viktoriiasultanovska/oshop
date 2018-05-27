import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductService {
  products: Observable<any[]>;
  private dbPath = '/products';

  constructor(private db: AngularFireDatabase) {
  }

  create(product) {
    return this.db.list('products')
      .push(product);
  }

  getAll(): Observable<any> {
    this.products = this.db.list(this.dbPath, ref => ref.orderByChild('title'))
      .snapshotChanges();
    return this.products;
  }

  get(id): Observable<any> {
    return this.db.object('/products/' + id)
      .valueChanges();
  }

  update(id, product) {
    return this.db.object('/products/' + id)
      .update(product)
      .catch(error => this.handleError(error));
  }

  delete(id) {
    return this.db.object('/products/' + id)
      .remove()
      .catch(error => this.handleError(error));
  }

  /**
   *
   * @param error
   */
  private handleError(error) {
    console.log(error);
  }

}
