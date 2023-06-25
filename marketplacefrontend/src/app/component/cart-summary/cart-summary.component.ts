import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  // cart quantity
  totalQuantity: number = 0;

  // cart amount
  totalPrice: number = 0.00;

  constructor(
    private cartService: CartService
  ) { }

  // post construction
  ngOnInit(): void {


    this.updateCartStatus();

  } // end of ngOnInit()

  // update latest totalQuantity(cart quantity) and totalPrice(cart amount) to cartStatus(cart summary)
  updateCartStatus() {

    // get latest totalPrice(cart amount) and update to totalPrice of cartStatus
    this.cartService.totalPrice
      .subscribe(

        // when new event is received then assign this new value to UI
        data => this.totalPrice = data

      );

    // get latest totalQuantity(cart quantity) and update to totalQuantity of cartStatus
    this.cartService.totalQuantity
      .subscribe(
        // when new event is received then assign this new value to UI
        data => this.totalQuantity = data
      );

  } // end of updateCartStatus()

}