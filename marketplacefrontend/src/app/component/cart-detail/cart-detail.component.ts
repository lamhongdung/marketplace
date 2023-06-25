import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/payload/cart-item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  // cart details
  cartItems: CartItem[] = [];

  // cart amount
  totalPrice: number = 0;

  // cart quantity
  totalQuantity: number = 0;

  constructor(
    private cartService: CartService
  ) { }

  // post construction
  ngOnInit(): void {

    this.listCartDetails();

  } // end of ngOnInit()

  // 
  listCartDetails() {

    // get cartItems from cartService
    this.cartItems = this.cartService.cartItems;

    // get latest cart amount(total price)
    this.cartService.totalPrice
      .subscribe(

        data => this.totalPrice = data

      );

    // get latest "total quantity"
    this.cartService.totalQuantity
      .subscribe(

        data => this.totalQuantity = data

      );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();

  } // end of listCartDetails()

  // increment quantity 1 when user clicks the '+' button
  increaseQuantity(theCartItem: CartItem) {

    // add theCartItem to cart
    this.cartService.addToCart(theCartItem);

  } // end of increaseQuantity()

  // decrement quantity 1 when user clicks the '-' button
  decreaseQuantity(theCartItem: CartItem) {

    // decrease quantity of item theCartItem in cart
    this.cartService.decrementQuantity(theCartItem);

  } // end of decreaseQuantity()

  // remove cartItem from cart
  remove(theCartItem: CartItem) {

    this.cartService.remove(theCartItem);

  } // end of remove()

}
