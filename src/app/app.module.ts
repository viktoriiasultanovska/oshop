import {environment} from './../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {RouterModule} from '@angular/router';

import {AppComponent} from 'app/app.component';
import {LoginComponent} from 'app/core/components/login/login.component';
import {AuthGuard} from 'shared/services/auth-guard/auth-guard.service';
import {SharedModule} from 'shared/shared.module';
import {AdminModule} from 'app/admin/admin.module';
import {ShoppingModule} from 'app/shopping/shopping.module';
import {CoreModule} from 'app/core/core.module';
import {ProductsComponent} from './shopping/components/products/products.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AdminModule,
    ShoppingModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'login', component: LoginComponent},
    ])
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
