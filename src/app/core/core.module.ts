import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {BsNavbarComponent} from './components/bs-navbar/bs-navbar.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    NgbModule.forRoot(),
    RouterModule.forChild([])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule {
}
