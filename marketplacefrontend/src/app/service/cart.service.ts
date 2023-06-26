import { Injectable } from '@angular/core';
import { CartItem } from '../payload/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // list of items in cart
  cartItems: CartItem[] = [];

  // initial value of totalQuantity = 0.
  // Subject is a subclass of Observable.
  // BehaviorSubject is a subclass of Subject.
  // When there is a certain subcriber subscribes to BehaviorSubject then
  // BehaviorSubject will publish latest value(not include passed values) to subscribers.
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  // initial value of totalPrice = 0.
  // Subject is a subclass of Observable.
  // BehaviorSubject is a subclass of Subject.
  // When there is a certain subcriber subscribes to BehaviorSubject then
  // BehaviorSubject will publish latest value(not include passed values) to subscribers.
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);

  // 
  storage: Storage = sessionStorage;
  // storage: Storage = localStorage;

  constructor() {

    // read data from storage
    // note: 
    // - "!" is a non-null assertion operator.
    // - It removes null and undefined from a type without doing any explicit type checking.
    // - use this "!" operator to avoid error: 
    // "Argument of type 'string | null' is not assignable to parameter of type 'string'"
    let cartItems = JSON.parse(this.storage.getItem('cartItems')!);

    // if there are any items in cart
    if (cartItems != null) {

      // load cartItems from session storage into cartItems property
      this.cartItems = cartItems;

      // compute totals based on the cartItems that is read from storage
      this.computeCartTotals();

    }

  } // end of constructor()

  // add product to cart
  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;

    // cartItem which is existing in cart
    let existingCartItem: CartItem | undefined;

    // if cart is not empty
    if (this.cartItems.length > 0) {

      //
      // find the item in the cart based on item id.
      //
      // - if found: returns the value of the first element in the array where predicate is true
      // - else(not found): return "undefined".
      // <==> for(let tempCartItem of this.cartItems){
      //        if (tempCartItem.id === theCartItem.id){
      //          existingCartItem = tempCartItem;
      //          break;
      //        }
      //      }
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);

    } // end of if()

    // if theCartItem already existed in cart then only increase quantity
    if (alreadyExistsInCart) {

      // increment the quantity.
      // because both existingCartItem and cartItems[i] refer to the same memory erea,
      // so changes of existingCartItem value then also change of cartItems[i] value.
      existingCartItem!.quantity++;

    }
    else { // theCartItem has not yet existed in cart

      // just add the item to the array
      this.cartItems.push(theCartItem);

    }

    // compute cart total price(cart amount) and total quantity(cart quantity)
    this.computeCartTotals();

  } // end of addToCart()

  // compute cart total price(cart amount) and total quantity(cart quantity)
  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    // browse through all cartItems in cart
    for (let currentCartItem of this.cartItems) {

      // line amount = quantity * unitPrice
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice!;

      // total quantity
      totalQuantityValue += currentCartItem.quantity;

    } // end of for()

    // publish value of totalPriceValue to all subscribers(cartSummary).
    this.totalPrice.next(totalPriceValue);

    // publish value of totalQuantityValue to all subscribers(cartSummary).
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);

    // save cartItems to session storage
    this.persistCartItems();

  }

  // save cartItems to session storage
  persistCartItems() {

    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));

  } // end of persistCartItems()

  // log cart data just for debugging purposes
  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('Contents of the cart');

    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice!;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    // toFixed(2): mean 2 digits after decimal(ex: 123.68)
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('----');
  }

  // decrease quantity 1 for item from cart
  decrementQuantity(theCartItem: CartItem) {

    // decrease quantity 1 for item
    theCartItem.quantity--;

    // if quantity == 0 then remove item from cart
    if (theCartItem.quantity === 0) {

      // remove theCartItem from cartItems
      this.remove(theCartItem);

    }
    else { // re-compute cart total

      this.computeCartTotals();

    }

  } // end of decrementQuantity()

  // remove theCartItem from cart
  remove(theCartItem: CartItem) {

    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {

      // remove 1 element at position itemIndex
      this.cartItems.splice(itemIndex, 1);

      // re-compute cart total
      this.computeCartTotals();
    }

  } // end of remove()

} // end of class CartService
