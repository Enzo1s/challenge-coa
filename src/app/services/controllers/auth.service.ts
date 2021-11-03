import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebase: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

   createuser(user: User): Observable<any> {
     return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
      map((res) =>  res.user?.uid)
    );
   }

   singIn(user: User): Observable<any>{
     return from(this.afAuth.signInWithEmailAndPassword(user.email, user.password)).pipe(
       map((res) =>  res.user?.uid)
     );
   }

   logOut(): Observable<void> {
     return from(this.afAuth.signOut());
   }

   getToken(): Observable<string | null>{
     return this.afAuth.idToken;
   }
}
