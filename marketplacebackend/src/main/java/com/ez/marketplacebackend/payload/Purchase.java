package com.ez.marketplacebackend.payload;

import com.ez.marketplacebackend.entity.Order;
import com.ez.marketplacebackend.entity.OrderItem;
import com.ez.marketplacebackend.entity.User;
import lombok.*;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class Purchase {

//    private User user;

    private Order order;

    private Set<OrderItem> orderItems;

}
