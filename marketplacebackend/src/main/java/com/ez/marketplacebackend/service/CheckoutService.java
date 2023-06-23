package com.ez.marketplacebackend.service;

import com.ez.marketplacebackend.payload.Purchase;
import com.ez.marketplacebackend.payload.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
