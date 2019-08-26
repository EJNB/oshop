/*** Usaremos este servicio para trabajar con los objetos user in our database */
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/user.model';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private appUser: AngularFirestoreDocument<AppUser>;

  constructor(private afs: AngularFirestore) { }

  save(user: firebase.User) {
    this.afs.doc('users/'+user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  //probar si esto lo puedo mejorar retornando solo el obj AngularFireObject
 /*  get(uid: string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/'+uid).valueChanges();
  } */
}
