import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private firestore: AngularFirestore) { }

  get<T>(term: string): Observable<T[]> {
    return this.firestore.collection<T>(term).valueChanges();
  }

}
