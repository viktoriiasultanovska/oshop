import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Product} from 'shared/models/product';

@Injectable()
export class ProductService {
  products: Observable<any[]>;
  productsRef = null;
  private dbPath = '/products';

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
  }

  create(product: Product) {
    return this.productsRef.push(product);
  }

  getAll() {
    return this.productsRef;
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
    return this.productsRef.remove(id)
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
