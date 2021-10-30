import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PrivateService {

  constructor(private firestore: AngularFirestore) { }

  post<T>(object: T, term: string): Promise<any> {
    return this.firestore.collection<T>(term).add(object);
  }
}
