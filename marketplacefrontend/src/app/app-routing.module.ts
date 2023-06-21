import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { UserCreateComponent } from './component/user-create/user-create.component';
import { LoginComponent } from './component/login/login.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  // sign up
  { path: 'signup', component: UserCreateComponent },
  // login
  { path: 'login', component: LoginComponent },
  // edit profile. only user has already logged-in can edit profile
  {
    path: 'edit-profile/:id', component: EditProfileComponent, canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    }
  },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-detail', component: CartDetailComponent },
  { path: 'product-list/:id', component: ProductDetailComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
  // if paths are not in the above list then redirects to path '/product-list'
  { path: '**', redirectTo: '/product-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
