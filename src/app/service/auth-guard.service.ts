import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate() {
    return this.auth.user$.map(user => {
      if (user) { return true; }

      this.router.navigate(['/login']);
      return false;
    });
  }

}
