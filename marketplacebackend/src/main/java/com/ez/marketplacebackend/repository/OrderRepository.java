package com.ez.marketplacebackend.repository;

import com.ez.marketplacebackend.entity.Order;
import com.ez.marketplacebackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
