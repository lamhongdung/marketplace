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

    @Column(name = "orderTrackingNumber")
    private String orderTrackingNumber;

    @Column(name = "totalQuantity")
    private int totalQuantity;

    @Column(name = "totalPrice")
    private BigDecimal totalPrice;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

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

    @Column(name = "status")
    private String status;

    @Column(name = "dateCreated")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "lastUpdated")
    @UpdateTimestamp
    private Date lastUpdated;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private Set<OrderItem> orderItems = new HashSet<>();

    public void add(OrderItem item) {

        if (item != null) {
            if (orderItems == null) {
                orderItems = new HashSet<>();
            }

            orderItems.add(item);
            item.setOrder(this);
        }
    }
}
