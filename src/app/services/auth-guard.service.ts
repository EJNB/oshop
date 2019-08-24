import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  //este metodo debe retornar un Observable<boolean> o Promise<boolean>
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //I need remaping this Observable firebase user to Observable of boolean
    return this.auth.user$
      .pipe(
        map(user=> {
          if(user) return true;

          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url }});
          return false;
        })
      );
  }
}
