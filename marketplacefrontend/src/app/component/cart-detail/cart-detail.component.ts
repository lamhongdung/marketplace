import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/payload/cart-item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {

    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    // get order amount
    this.cartService.totalPrice
      .subscribe(
        data => this.totalPrice = data
      );

    // get "total quantity"
    this.cartService.totalQuantity
      .subscribe(
        data => this.totalQuantity = data
      );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  // increment quantity 1 to cart item
  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  // decrement quantity 1 to cart item
  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  // remove item from cart
  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}
