import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from 'src/app/enum/NotificationType.enum';
import { CartItem } from 'src/app/payload/cart-item';
import { Product } from 'src/app/payload/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // list of products
  products: Product[] = [];

  // search term
  searchTerm: string = "";

  //
  // properties for pagination
  //

  // current page
  thePageNumber: number = 1;

  // thePageSize = 8;
  thePageSize: number = environment.pageSize;

  // initial page size of 'pageSize' dropdown
  thePageSizeInit: number = environment.pageSize;

  // total products based on search criteria
  theTotalElements: number = 0;

  // the "Search product" form
  searchProduct = this.formBuilder.group({

    // search term
    searchTerm: ['']

  });

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService
  ) {
  }

  // ngOnInit() is similar to @PostConstruct
  ngOnInit() {

    // search products
    this.searchProducts(this.thePageNumber, this.thePageSize, this.searchProduct.value.searchTerm!);

  } // end of ngOnInit()

  // get products, total products
  searchProducts(pageNumber: number, pageSize: number, searchTerm: string) {

    // get products
    this.productService.searchProducts((pageNumber - 1) * pageSize, pageSize, searchTerm)

      .subscribe({

        // get products successful
        next: (data: Product[]) => {

          return this.products = data

        },

        // there are some errors when get products
        error: (errorResponse: HttpErrorResponse) => {

          // show the error message to user
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      });

    // get total products(total elements)
    this.productService.getTotalProducts(searchTerm)

      .subscribe({

        // get total products successful
        next: (data: number) => {

          // total products
          this.theTotalElements = data;

        },

        // there are some errors when get total products
        error: (errorResponse: HttpErrorResponse) => {

          // show the error message to user
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      });

  } // end of searchProducts()

  // when user selects the dropdown 'PageSize' then update its page size
  updatePageSize(pageSize: number) {

    // update new page size
    this.thePageSize = pageSize;

    // reset page number to 1
    this.thePageNumber = 1;

    // search products
    this.searchProducts(this.thePageNumber, this.thePageSize, this.searchProduct.value.searchTerm!)

  } // end of updatePageSize()

  // add product to cart
  addToCart(theProduct: Product) {

    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    // create new cartItem with quantity = 1
    const theCartItem = new CartItem(theProduct);

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

} // end of class ProductListComponent

