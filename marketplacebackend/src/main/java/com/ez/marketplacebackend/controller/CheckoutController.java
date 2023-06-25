package com.ez.marketplacebackend.controller;

import com.ez.marketplacebackend.payload.Purchase;
import com.ez.marketplacebackend.payload.PurchaseResponse;
import com.ez.marketplacebackend.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CheckoutController {

    // proceed for place order and checkout
    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    // when user press "Purchase" button in "Checkout" screen
    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = checkoutService.purchase(purchase);

        return purchaseResponse;
    } // end of placeOrder()

}
