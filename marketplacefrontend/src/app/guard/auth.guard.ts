import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/NotificationType.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {

  }

  // return:
  //    - true: allow access the page
  //    - false: do not allow to access the page
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // check whether user already logged in or not?
    if (this.isUserLoggedIn()) {

      let role = this.authService.getRoleFromLocalStorage();

      console.log("role:" + role);

      // if role is not correct
      if (route.data['roles'].indexOf(role) === -1) {

        this.router.navigate(['/product-list'], {
          queryParams: { returnUrl: state.url }
        });

        return false;

      }

      return true;
    }

    // if user has not yet logged in then re-direct to the "login" page
    this.router.navigate(['/login']);

    this.notifierService.notify(NotificationType.ERROR, `You need to log in to access this page`);

    return false;

  } // end of canActivate()

  // check whether user logged in or not
  private isUserLoggedIn(): boolean {

    // if user logged in then return true(means allow to access the page)
    if (this.authService.isLoggedInUser()) {

      return true;

    }

    return false;
  } // end of isUserLoggedIn()

}