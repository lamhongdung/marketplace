package com.ez.marketplacebackend.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name = "orderItem")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "productId")
//    @Min(value = 1, message = "Value of productId must be greater than or equal to 1")
    private Long productId;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "unitPrice")
    private BigDecimal unitPrice;

    // many 'orderItem' belong to 1 'order'.
    // @JoinColumn(name = "orderId"): 'orderId' is foreign key in table 'orderItem'
    @ManyToOne
    @JoinColumn(name = "orderId")
    private Order order;

}
