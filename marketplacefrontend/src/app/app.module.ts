import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductService } from './service/product.service';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserCreateComponent } from './component/user-create/user-create.component';
import { NotifierModule } from 'angular-notifier';
import { NotificationModule } from './notification.module';
import { LoginComponent } from './component/login/login.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CartSummaryComponent } from './component/cart-summary/cart-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    CartDetailComponent,
    CheckoutComponent,
    ProductDetailComponent,
    UserCreateComponent,
    LoginComponent,
    EditProfileComponent,
    CartSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NotifierModule,
    NotificationModule
  ],
  providers: [ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
