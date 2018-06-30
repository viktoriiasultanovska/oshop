import {Component} from '@angular/core';
import {AuthService} from 'app/shared/services/auth/auth.service';
import {Router} from '@angular/router';
import {UserService} from 'app/shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      if (!user) {
        return;
      }
      userService.save(user);
      const returnUrl = localStorage.getItem('returnUrl');
      if (returnUrl) {
        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
