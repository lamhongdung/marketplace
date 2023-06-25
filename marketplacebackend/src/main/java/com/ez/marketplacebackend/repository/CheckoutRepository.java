package com.ez.marketplacebackend.repository;

import com.ez.marketplacebackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// this interface is used to save 'order' and 'orderItems'
@Repository
public interface CheckoutRepository extends JpaRepository<Order, Long> {
}
