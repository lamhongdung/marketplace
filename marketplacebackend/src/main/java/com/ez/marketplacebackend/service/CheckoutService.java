package com.ez.marketplacebackend.service;

import com.ez.marketplacebackend.entity.Order;
import com.ez.marketplacebackend.entity.OrderItem;
import com.ez.marketplacebackend.payload.Purchase;
import com.ez.marketplacebackend.payload.PurchaseResponse;
import com.ez.marketplacebackend.repository.CheckoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    // when user press 'Purchase' button
    @Transactional
    public PurchaseResponse purchase(Purchase purchase) {

        // get the order info
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // save 'order' and 'orderItems' to the database
        checkoutRepository.save(order);

        // return a response
        return new PurchaseResponse(orderTrackingNumber);

    } // end of purchase()

    // generate a random UUID number (UUID version-4)
    // For details see: https://en.wikipedia.org/wiki/Universally_unique_identifier
    private String generateOrderTrackingNumber() {

        return UUID.randomUUID().toString();

    }
}
