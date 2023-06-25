package com.ez.marketplacebackend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // unique id and hard to guess
    @Column(name = "orderTrackingNumber")
    private String orderTrackingNumber;

    // order quantity
    @Column(name = "totalQuantity")
    private int totalQuantity;

    // order amount
    @Column(name = "totalPrice")
    private BigDecimal totalPrice;

    // if user already logged in then get his user id.
    // else if user has not yet logged in then set userId = 0.
    @Column(name = "userId")
    private int userId;

    //
    //
    //
//    @NotBlank(message = "Please input an email")
//    @Email(message = "Email is incorrect format")
    @Column(name = "email")
    private String email;

    //    @Size(min = 1, max = 50, message = "Length of the first name must be between 1 and 50 characters")
    @Column(name = "firstName")
    private String firstName;

    //    @Size(min = 1, max = 50, message = "Length of last name must be between 1 and 50 characters")
    @Column(name = "lastName")
    private String lastName;

    // allow to use @Pattern because datatype of phone is String
//    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits length")
    @Column(name = "phone")
    private String phone;

    //    @Size(min = 1, max = 100, message = "Length of shipping address must be between 1 and 100 characters")
    @Column(name = "shippingAddress")
    private String shippingAddress;


    //
    //
    //

    // the order was created on this datetime
    @Column(name = "dateCreated")
    @CreationTimestamp
    private Date dateCreated;

    // last time this order was updated on this datetime
    @Column(name = "lastUpdated")
    @UpdateTimestamp
    private Date lastUpdated;

    // one 'order' has many 'orderItems'.
    // mappedBy = "order": 'order' is an object in table 'OrderItem'.
    // cascade = CascadeType.ALL: when 'order' is saved in database then
    // 'orderItems' also is saved in database.
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private Set<OrderItem> orderItems = new HashSet<>();

    // add item to orderItems
    // and set field 'orderId' in table 'orderItem' equals to id of this 'order' object
    public void add(OrderItem item) {

        if (item != null) {
            if (orderItems == null) {
                orderItems = new HashSet<>();
            }

            orderItems.add(item);

            // set 'orderId' of 'orderItems' equal to 'id' of 'order'
            item.setOrder(this);

        }
    } // end of add()
}
