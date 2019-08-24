/*** Usaremos este servicio para trabajar con los objetos user in our database */
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/'+user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  //probar si esto lo puedo mejorar retornando solo el obj AngularFireObject
  get(uid: string): Observable<AppUser> {
    return this.db.object<AppUser>('/users/'+uid).valueChanges();
  }
}
