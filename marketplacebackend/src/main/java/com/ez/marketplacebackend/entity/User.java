package com.ez.marketplacebackend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Entity
public class User implements Serializable {
    @Id
    // GenerationType.IDENTITY: id is generated by mySQL
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Min(value = 1, message = "Value of id must be greater than or equal to 1")
    private Long id;

    @NotBlank(message = "Please input an email")
    @Email(message = "Email is incorrect format")
    private String email;

    // JsonProperty.Access.WRITE_ONLY:
    // the property may only be written(set) as part of deserialization
    // (using "setter" method, or assigning to Field, or passed as Creator argument)
    // but will not be read(get) for serialization
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Size(min = 1, max = 50, message = "Length of the first name must be between 1 and 50 characters")
    private String firstName;

    @Size(min = 1, max = 50, message = "Length of last name must be between 1 and 50 characters")
    private String lastName;

    // allow to use @Pattern because datatype of phone is String.
    // we cannot use @Pattern if datatype is number(ex: Integer).
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits length")
    private String phone;

    @Size(min = 1, max = 100, message = "Length of shipping address must be between 1 and 100 characters")
    private String shippingAddress;

    // role of customer is 'ROLE_CUSTOMER'
    @Pattern(regexp = "ROLE_CUSTOMER", message = "Role value must be ROLE_CUSTOMER")
    private String role;

    // Active or Inactive
    @Pattern(regexp = "Active|Inactive", message = "Value of status must be 'Active' or 'Inactive'")
    private String status;

}
