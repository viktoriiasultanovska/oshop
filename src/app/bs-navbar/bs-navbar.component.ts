import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../service/auth/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(public auth: AuthService) {

  }

  logout() {
    this.auth.logout();
  }

}
