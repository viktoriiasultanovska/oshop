import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from 'app/shared/services/auth/auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService) {
  }


  canActivate(): Observable<boolean> {
    return this.auth.appUser$
      .map(appUser => appUser.isAdmin);
  }

}
