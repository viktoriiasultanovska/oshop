import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../user/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';


@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
  }


  canActivate(): Observable<boolean> {
    return this.auth.user$
      .switchMap(user => {
        return this.userService.get(user.uid).valueChanges();
      })
      .map(appUser => appUser.isAdmin);
  }

}
