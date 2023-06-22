import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Order } from 'src/app/payload/order';
import { OrderItem } from 'src/app/payload/order-item';
import { Purchase } from 'src/app/payload/purchase';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { CustomValidator } from 'src/app/validator/CustomValidator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // allow display spinner icon or not
  // =true: allow to display spinner in the "Purchase" button
  // =false: does not allow to display spinner in the "Purchase" button
  showSpinner: boolean = false;

  checkoutForm!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  storage: Storage = sessionStorage;

  // error messages
  errorMessages = {
    email: [
      { type: 'required', message: 'Please input an email' },
      { type: 'pattern', message: 'Email is incorrect format' }
    ],
    firstName: [
      { type: 'required', message: 'Please input the first name' },
      { type: 'maxlength', message: 'First name cannot be longer than 50 characters' },
    ],
    lastName: [
      { type: 'required', message: 'Please input the last name' },
      { type: 'maxlength', message: 'Last name cannot be longer than 50 characters' },
    ],
    phone: [
      { type: 'required', message: 'Please input phone number' },
      { type: 'pattern', message: 'Phone number must be 10 digits length' }
    ],
    shippingAddress: [
      { type: 'required', message: 'Please input shipping address' },
      { type: 'maxlength', message: 'Shipping address cannot be longer than 100 characters' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) {

  }

  ngOnInit(): void {



    // read the user's email address from browser storage
    // const theEmail = JSON.parse(this.storage.getItem('userEmail')!);

    // initial form
    this.initForm();

    this.reviewCartDetails();

  }

  // initial form
  initForm() {

    this.checkoutForm = this.formBuilder.group({

      // required and must be in correct format 
      email: ['',
        [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      // required and max length = 50 characters
      firstName: ['',
        [Validators.required,
        Validators.maxLength(50)]],

      // required and max length = 50 characters
      lastName: ['',
        [Validators.required,
        Validators.maxLength(50)]],

      // required and length must be 10 digits
      phone: ['',
        [Validators.required,
        Validators.pattern("^[0-9]{10}$")]],

      // required and max length = 100 characters
      shippingAddress: ['',
        [Validators.required,
        Validators.maxLength(100)]],

    });

  } // end of initForm()

  reviewCartDetails() {

    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }

  // define getters
  get email() { return this.checkoutForm.get('email'); }
  get firstName() { return this.checkoutForm.get('firstName'); }
  get lastName() { return this.checkoutForm.get('lastName'); }
  get phone() { return this.checkoutForm.get('phone'); }
  get shippingAddress() { return this.checkoutForm.get('shippingAddress'); }

  purchase() {
    console.log("Handling the submit button");

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    // - long way
    // let orderItems: OrderItem[] = [];
    // for (let i=0; i < cartItems.length; i++) {
    //   orderItems[i] = new OrderItem(cartItems[i]);
    // }

    // - short way of doing the same thing
    // convert cartItems to OrderItem[]
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    // purchase.customer = this.checkoutFormGroup!.controls['customer'].value;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
      // "next" means success
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

        // reset cart
        this.resetCart();

      },
      //  "error" means error/exception
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
    );

  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutForm!.reset();

    // navigate back to the product page
    this.router.navigateByUrl("/products");
  }
}
