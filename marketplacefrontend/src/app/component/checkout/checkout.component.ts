import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/enum/NotificationType.enum';
import { Order } from 'src/app/payload/order';
import { OrderItem } from 'src/app/payload/order-item';
import { Purchase } from 'src/app/payload/purchase';
import { User } from 'src/app/payload/user';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { UserService } from 'src/app/service/user.service';
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

  // customer information form
  customerForm!: FormGroup;

  // cart quantity
  totalQuantity: number = 0;

  // cart amount
  totalPrice: number = 0;

  // user id of the logged in user
  userId: number = 0;

  storage: Storage = sessionStorage;

  // error messages
  errorMessages = {
    email: [
      { type: 'required', message: 'Please input an email' },
      { type: 'pattern', message: 'Email is incorrect format' }
    ],
    firstName: [
      { type: 'required', message: 'Please input the first name' },
      { type: 'allWhitespace', message: 'First name does not allow all white spaces' },
      { type: 'maxlength', message: 'First name cannot be longer than 50 characters' },
    ],
    lastName: [
      { type: 'required', message: 'Please input the last name' },
      { type: 'allWhitespace', message: 'Last name does not allow all white spaces' },
      { type: 'maxlength', message: 'Last name cannot be longer than 50 characters' },
    ],
    phone: [
      { type: 'required', message: 'Please input phone number' },
      { type: 'pattern', message: 'Phone number must be 10 digits length' }
    ],
    shippingAddress: [
      { type: 'required', message: 'Please input shipping address' },
      { type: 'allWhitespace', message: 'Shipping address does not allow all white spaces' },
      { type: 'maxlength', message: 'Shipping address cannot be longer than 100 characters' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private notifierService: NotifierService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {

  }

  // post construction
  ngOnInit(): void {

    // get user id of the logged-in user.
    // the "+" sign: use to convert string to number
    this.userId = +this.authService.getIdFromLocalStorage();
    console.log(`userid: ${this.userId}`);

    // initial form
    this.initForm();

    // if user logged in then loading user information into customerForm
    if (this.userId > 0) {

      // get user by user id for load existing user to form
      this.userService.findById(this.userId)
        .subscribe({

          // get user successful
          next: (data: User) => {

            // load user information to customerForm
            this.customerForm.controls['email'].setValue(data.email);
            this.customerForm.controls['firstName'].setValue(data.firstName);
            this.customerForm.controls['lastName'].setValue(data.lastName);
            this.customerForm.controls['phone'].setValue(data.phone);
            this.customerForm.controls['shippingAddress'].setValue(data.shippingAddress);

          },

          // there are some errors when get user from database 
          error: (errorResponse: HttpErrorResponse) => {
            // show error message to user
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          }
        });
    }

    // cart quantity and cart amount
    this.cartSummary();

  }

  // initial form
  initForm() {

    this.customerForm = this.formBuilder.group({

      // required and must be in correct format 
      email: ['',
        [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      // required and max length = 50 characters
      firstName: ['',
        [Validators.required,
        CustomValidator.allWhitespace,
        Validators.maxLength(50)]],

      // required and max length = 50 characters
      lastName: ['',
        [Validators.required,
        CustomValidator.allWhitespace,
        Validators.maxLength(50)]],

      // required and length must be 10 digits
      phone: ['',
        [Validators.required,
        Validators.pattern("^[0-9]{10}$")]],

      // required and max length = 100 characters
      shippingAddress: ['',
        [Validators.required,
        CustomValidator.allWhitespace,
        Validators.maxLength(100)]],

    });

  } // end of initForm()

  // define getters
  get email() { return this.customerForm.get('email'); }
  get firstName() { return this.customerForm.get('firstName'); }
  get lastName() { return this.customerForm.get('lastName'); }
  get phone() { return this.customerForm.get('phone'); }
  get shippingAddress() { return this.customerForm.get('shippingAddress'); }

  // cart summary
  cartSummary() {

    // get latest value of totalQuantity(cart quantity) from cartService
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // get latest value of totalPrice(cart amount) from cartService
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  } // end of cartSummary()

  // when user presses the 'Purchase' button
  purchase() {

    // set up order(cart header)
    let order = new Order();
    order.userId = this.userId;
    order.email = this.email?.value;
    order.firstName = this.firstName?.value
    order.lastName = this.lastName?.value;
    order.phone = this.phone?.value;
    order.shippingAddress = this.shippingAddress?.value;
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    //
    // convert cartItems to OrderItem[].
    //
    // create orderItems from cartItems
    // let orderItems: OrderItem[] = [];
    // for (let i=0; i < cartItems.length; i++) {
    //   orderItems[i] = new OrderItem(cartItems[i]);
    // }
    // <==>
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - order(order header) and orderItems(order details)
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.purchase(purchase)
      .subscribe({

        // save the order and orderItems successful
        next: response => {

          // send notification to user
          this.sendNotification(
            NotificationType.SUCCESS,
            `Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

          // reset cart
          this.resetCart();

        },

        //  there are some errors when save the order
        error: err => {

          this.sendNotification(
            NotificationType.ERROR, `There was an error: ${err.message}`);

        }
      });
  }

  // reset cart
  resetCart() {

    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems();

    // reset the form
    this.customerForm!.reset();

    // navigate back to the product-list page
    this.router.navigateByUrl("/product-list");

  } // end of resetCart()

  // send notification to user
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(notificationType, 'An error occurred. Please try again.');
    }
  } // end of sendNotification()

} // end of class CheckoutComponent
