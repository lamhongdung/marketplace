import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase } from '../payload/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = environment.apiUrl + '/purchase';

  constructor(
    private httpClient: HttpClient
  ) { }

  // when user clicks on the 'Purchase' button in 'Checkout' screen
  purchase(purchase: Purchase): Observable<any> {

    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);

  } // end of purchase()

} // end of class CheckoutService
