import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../user/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) {
  }


  canActivate(): Observable<boolean> {
    return this.auth.user$
      .switchMap(user => this.userService.get(user.uid).valueChanges())
      .map(appUser => appUser.isAdmin);
  }

}
