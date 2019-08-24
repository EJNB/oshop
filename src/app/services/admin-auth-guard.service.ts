import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.authService.user$
      /* Aqui lo q me devuelve propiedad user$ d authservice es un Observable<firebase.User>
       y lo debo mapear para retornar un Observable<boolean>*/
      .pipe(
        switchMap(user=> this.userService.get(user.uid)),
        map(appUser=> appUser.isAdmin)
      );
  }
}

/*nota:
En este auth guard, lo q pasa es lo siguiente,
1. El user trata de acceder a una url protegida, en donde solo pueden acceder los usuarios con rol Admin
2. Aplico el operador switchMap con el objetivo de retornar un objeto de tipo AppUser 
  2.1 Busco el user guardado en base de datos de firebase q guardamos previamente en login.
  En esta funcion recibo del observable user$ un obj user: firebase.User el cual no es el tipo del q tengo guardado en mi bd en firebase, por tanto
  este usuario no tiene la propiedad Admin, es decir no puedo hacer user.Admin
  2.2 Del metodo userService.get(uid) recibo un observable de AppUser, para esto necesito cambiar el mapeo en un nuevo observable


el ultimo valor emitido por el observable user$ 
*/
