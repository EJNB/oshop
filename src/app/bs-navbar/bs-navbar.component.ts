import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-users';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styles: ['#navbarDropdown { cursor: pointer; }']
})
export class BsNavbarComponent {

  appUser: AppUser
  
  constructor(private auth: AuthService) { 
    auth.appUser$.subscribe(user=> this.appUser = user)
  }

  logout() {
    this.auth.logout();
  }
}
