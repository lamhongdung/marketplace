import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {

    if (httpRequest.url.includes(`${this.authService.host}/login`) ||
      (httpRequest.url.includes(`${this.authService.host}/signup`)) ||
      (httpRequest.url.includes(`${this.authService.host}/product-list`)) ||
      (httpRequest.url.includes(`${this.authService.host}/product-total-elements`)) ||
      (httpRequest.url.includes(`${this.authService.host}/product-search`))
    ) {

      // let forward it(do nothing)
      return httpHandler.handle(httpRequest);

    }

    // this.authService.loadToken();
    // const token = this.authService.getToken();
    const token = this.authService.getTokenFromLocalStorage();

    // add token in the header of the request
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

    console.log("token:" + token);

    return httpHandler.handle(request);

  }

}
