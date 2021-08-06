import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  list(arg0: string, arg1: (ref: any) => any) {
    throw new Error('Method not implemented.');
  }
  published: any;

  constructor(private db: AngularFireDatabase) { }


  /**
   * @param  {} path  node adresi
   * @param  {} data  kaydedilecek json data
   */
  saveData(path: string, data: any) {
    return new Promise((resolve: any) => {
      this.db.list(`${path}/`).push(data)
      resolve()
    })
  }

  /**
   * @param  {} path node adresi
   */
  removeData(path: string) {
    return new Promise((resolve: any) => {
      this.db.object(`${path}`).remove();
      resolve()
    })
  }

  /**
   * @param  {string} path  node adresi
   * @param  {string} key    data uid
   * @param  {any} data  guncellenecek data
   */

  updateData(path: string, key: string, data: any) {
    return new Promise((resolve: any) => {
      this.db.object(`${path}/${key}`).update(data)
      resolve()
    })
  }
  /**
   * @param  {string} path
   * @param  {string} key
   * @param  {any} data
   */
  setData(path: string, key: string, data: any) {
    return new Promise((resolve: any) => {
      this.db.object(`${path}/${key}`).set(data)
      resolve()
    })
  }
  /**
   * @param  {string} path  node adresi
   */
  getKeys(path: string) {
    return this.db.list(`${path}`)
      .snapshotChanges().map(changes => {
        return changes.map((c: any) => ({
          key: c.payload.key
        }))
      })
  }
  /**
   * @param  {string} path
   * @param  {number} index
   */
  getLimitedData(path: string, index: number) {
    return this.db.list(`${path}`, ref =>
      ref.orderByKey().limitToFirst(index))
      .snapshotChanges().map(changes => {
        return changes.map((c: any) => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
  }
  /**
   * @param  {string} path
   */
  getData(path: string) {

    return this.db.object(`${path}`).valueChanges().first()

  }
  /**
   * @param  {string} path
   */
  getListWithoutKey(path: string) {
    return this.db.list(`${path}`)
      .snapshotChanges().map(changes => {
        return changes.map((c: any) => ({
          ...c.payload.val()
        }))
      })
  }
  /**
   * @param  {string} path
   */
  getListWithKey(path: string) {
    return this
      .db
      .list(`${path}`)
      .snapshotChanges()
      .map(changes => {
        return changes
          .map((c: any) => ({
            key: c
              .payload
              .key, ...c
                .payload.val()
          }))
      })
  }

  /**
   * @param  {string} path
   * @param  {string} field
   */
  setValueTrue(path: string, field: string) {
    this.db.database.ref(path).child(field).set(true)
  }

  getDataStartWith(path: string, startWith: any) {
    return this.db.list(`${path}`, ref =>
      ref.orderByKey().startAt(startWith).endAt(startWith + "\uf8ff"))
      .snapshotChanges().map(changes => {
        return changes.map((c: any) => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
  }
  getLastKey(path: string) {
    return this.db.list(`${path}`, ref =>
      ref.orderByKey().limitToLast(1))
      .snapshotChanges().map(changes => {
        return changes.map((c: any) => ({
          key: c.payload.key
        }))
      })
  }
  getFirstKey(path: string) {
    return this.db.list(`${path}`, ref =>
      ref.orderByKey().limitToFirst(1))
      .snapshotChanges().map(changes => {
        return changes.map((c: any) => ({
          key: c.payload.key
        }))
      })
  }

  checkExistData(path: string) {
    return firebase.database().ref(`${path}`).ref.once("value")
      .then(snapshot => snapshot.exists());
  }


  getCategories(parent:string) {
    return this.db.list(`categories`, ref =>
      ref.orderByChild('parent').equalTo(parent))
      .snapshotChanges().map(changes => {
        return changes.map((c: any) => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
  }
}
