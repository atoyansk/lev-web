import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudMethodsService {

  constructor(private db: AngularFireDatabase) { }

  getItems(basePath: string) {
    return this.db.list(basePath).snapshotChanges().pipe(map(changes => {
      return changes.map(c => {
        const data = c.payload.val();
        const id = c.payload.key;
        return { key: id, ...(data as object) };
      });
    }));
  }

  getItem(basePath: string, field: string, value: any) {
    return this.db.list(basePath, res => res.orderByChild(field).equalTo(value)).valueChanges();
  }

  // getItemSort(basePath: string, field: string, value: any, field2: string, sort: any) {
  //   return this.firestore.collection(basePath, res => res.where(field, '==', value).orderBy(field2, sort)).snapshotChanges();
  // }

  // getFilter(basePath: string, field: string, value: any, field2: string, value2: any) {
  //   return this.firestore.collection(basePath, res => res.where(field, '==', value).where(field2, '==', value2)).snapshotChanges();
  // }

  createItem(basePath: string, value: any) {
    return this.db.list(basePath).push(value);
  }

  updateItem(basePath: string, value: any, key: string) {
    this.db.object(basePath + '/' + key).update(value);
  }

  deleteItem(basePath: string, key: string) {
    return this.db.object(basePath + '/' + key).remove();
  }
}

