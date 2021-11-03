import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private firestore: AngularFirestore) { }

  get<T>(term: string): Observable<T[]> {
    return this.firestore.collection<T>(term).valueChanges({ idField: 'id' });
  }

  getId<T>(id: string, collectionName: string): Observable<any> {
    return this.firestore.collection<T>(collectionName).doc(id).snapshotChanges();
  }

  getTermIn<T>(term:string[], field:string, collectionName: string): Observable<T[]>{
    return this.firestore.collection<T>(collectionName, ref => ref.where(field, 'in',term)).valueChanges()
  }

  getTerm<T>(term: string, field: string, collectionName: string): Observable<T[]> {
    return this.firestore.collection<T>(collectionName, ref => ref.where(field, '==', term)).valueChanges();
  }
  getTermTerm<T>(term1: string, term2:string, field1: string, field2: string, collectionName: string): Observable<T[]> {
    return this.firestore.collection<T>(collectionName, ref => ref.where(field1, '==', term1).where(field2, '==', term2)).valueChanges({idfield: 'id'});
  }

  post<T>(object: T, collection: string): Promise<any> {
    return this.firestore.collection<T>(collection).add(object);
  }

  update<T>(object: T, id: string, collection: string): Promise<any> {
    return this.firestore.collection<T>(collection).doc(id).update(object);
  }
}
