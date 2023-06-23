package com.ez.marketplacebackend.service.impl;

import com.ez.marketplacebackend.entity.Order;
import com.ez.marketplacebackend.entity.OrderItem;
import com.ez.marketplacebackend.entity.User;
import com.ez.marketplacebackend.payload.Purchase;
import com.ez.marketplacebackend.payload.PurchaseResponse;
import com.ez.marketplacebackend.repository.OrderRepository;
import com.ez.marketplacebackend.repository.UserRepository;
import com.ez.marketplacebackend.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private OrderRepository orderRepository;

//    private UserRepository userRepository;
//
//    @Autowired
//    public CheckoutServiceImpl(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // retrieve the order info from payload
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

//        // populate customer with order
//        User user = purchase.getUser();
//        user.add(order);

        // save to the database
//        userRepository.save(user);
        orderRepository.save(order);

        // return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    // generate a random UUID number (UUID version-4)
    // For details see: https://en.wikipedia.org/wiki/Universally_unique_identifier
    private String generateOrderTrackingNumber() {

        return UUID.randomUUID().toString();

    }
}
