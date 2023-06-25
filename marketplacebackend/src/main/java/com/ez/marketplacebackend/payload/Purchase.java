package com.ez.marketplacebackend.payload;

import com.ez.marketplacebackend.entity.Order;
import com.ez.marketplacebackend.entity.OrderItem;
import lombok.*;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class Purchase {

    // order header
    private Order order;

    // order details
    private Set<OrderItem> orderItems;

}
