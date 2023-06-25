package com.ez.marketplacebackend.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unitPrice")
    private BigDecimal unitPrice;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Column(name = "unitInStock")
    private int unitInStock;

    // product was created on this datetime
    @Column(name = "dateCreated")
    // hibernate will auto manage the timestamps
    @CreationTimestamp
    private Date dateCreated;

    // last time this product was updated on this datetime
    @Column(name = "lastUpdated")
    // hibernate will auto manage the timestamps
    @UpdateTimestamp
    private Date lastUpdated;

}
