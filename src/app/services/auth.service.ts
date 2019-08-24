import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) { 
    this.user$= afAuth.authState;
  }

  login(){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(()=> {
        // this.user$.subscribe(user=> {

        // })
        let returnUrl= localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      });//todo

      this.router.navigateByUrl(localStorage.getItem('returnUrl'))
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
