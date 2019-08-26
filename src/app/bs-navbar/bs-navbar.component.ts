import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/user.model';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styles: ['#navbarDropdown { cursor: pointer; }']
})
export class BsNavbarComponent {
  appUser: AppUser;
  constructor(private authService: AuthService) {
    // authService.appUser$.subscribe(appUser=> this.appUser= appUser)
  }

  logout() {
    this.authService.logout();
  }
}
