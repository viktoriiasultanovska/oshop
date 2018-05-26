import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AngularFireList} from 'angularfire2/database/interfaces';

@Injectable()
export class CategoryService {
  categoriesRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {

  }

  getCategories(): Observable<any> {
    this.categoriesRef = this.db.list('categories', ref => ref.orderByChild('name' ));
    /**
     * @see https://github.com/angular/angularfire2/blob/master/docs/rtdb/lists.md
     * @see https://github.com/angular/angularfire2/blob/master/docs/rtdb/querying-lists.md
     * @type {AngularFireList<any>}
     */
    // Use snapshotChanges().map() to store the key
    return this.categoriesRef.snapshotChanges();
  }

}
