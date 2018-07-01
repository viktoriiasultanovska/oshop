import {environment} from './../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from 'app/app.component';
import {LoginComponent} from 'app/core/components/login/login.component';
import {AuthGuard} from 'shared/services/auth-guard/auth-guard.service';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {DataTableModule} from 'angular5-data-table';
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
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    DataTableModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
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
