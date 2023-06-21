import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/enum/NotificationType.enum';
import { CartItem } from 'src/app/payload/cart-item';
import { Product } from 'src/app/payload/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // The "!" is the non-null assertion operator.
  // Tells typescript compiler to suspend strict null and undefined checks for a property.
  product!: Product;

  // product id
  id: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService
  ) { }

  // initial values
  ngOnInit(): void {

    // get product id from params of the active route.
    // and then get product object based on product id from database
    this.activatedRoute.paramMap.subscribe({

      next: (params: ParamMap) => {

        // get id from param of active route.
        // ex: http://localhost:4200/product-list/:id
        // ex: http://localhost:4200/product-list/1001
        // the sign "+": use to convert from string to number
        this.id = +params.get('id')!;

        // get product by product id
        this.productService.findById(this.id).subscribe({

          // if there is no error when get data from database
          next: (data: Product) => {

            this.product = data;

          },

          // if there is error when get data from database
          error: (errorResponse: HttpErrorResponse) => {

            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

          }

        });
      } // end of (params: ParamMap)
    }); // end of this.activatedRoute.paramMap.subscribe()

  } // end of ngOnInit()

  // add product to cart
  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);

    // create new cartItem with quantity = 1
    const theCartItem = new CartItem(this.product);

    // add cartItem to cart
    this.cartService.addToCart(theCartItem);

  } // end of addToCart()

  // send notification to user
  private sendNotification(notificationType: NotificationType, message: string): void {

    if (message) {
      this.notifierService.notify(notificationType, message);
    } else {
      this.notifierService.notify(notificationType, 'An error occurred. Please try again.');
    }

  } // end of sendNotification()

}