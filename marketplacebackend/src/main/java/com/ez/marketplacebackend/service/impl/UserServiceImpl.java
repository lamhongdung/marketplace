package com.ez.marketplacebackend.service.impl;

import com.ez.marketplacebackend.entity.User;
import com.ez.marketplacebackend.entity.UserPrincipal;
import com.ez.marketplacebackend.exception.BadDataException;
import com.ez.marketplacebackend.payload.EditProfile;
import com.ez.marketplacebackend.repository.UserRepository;
import com.ez.marketplacebackend.service.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import static com.ez.marketplacebackend.constant.Constant.*;

@Service
@Transactional
@Qualifier("userDetailsService")
public class UserServiceImpl implements UserService, UserDetailsService {

    // getClass() = UserServiceImpl.class
    private Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // get user info by email
    @Override
    public UserDetails loadUserByUsername(String email) {
        LOGGER.info("load user by email");

        // get user by email
        User user = userRepository.findUserByEmail(email);

        // not found user by email
        if (user == null) {
            LOGGER.info(NO_USER_FOUND_BY_EMAIL + email);
            try {
                throw new EntityNotFoundException(NO_USER_FOUND_BY_EMAIL + email);
            } catch (EntityNotFoundException e) {
                throw new RuntimeException(e);
            }
        } else { // found user by email

            UserPrincipal userPrincipal = new UserPrincipal(user);

            LOGGER.info(FOUND_USER_BY_EMAIL + email);

            return userPrincipal;
        }
    }

    // find user by id
    @Override
    public User findById(Long id) throws EntityNotFoundException {

        LOGGER.info("find user by id");

        // find user by user id
        return userRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(NO_USER_FOUND_BY_ID + id));
    }

    // find user by email
    @Override
    public User findUserByEmail(String email) {

        User user = userRepository.findUserByEmail(email);

        return user;
    }

    // check whether a user is inactive or not?
    // return:
    //  - not null: inactive user
    //  - null: not inactive user
    @Override
    public User isInactiveUser(String email) {

        User user = userRepository.isInactiveUser(email);

        return user;
    }

    // create new customer(customer signs up account).
    @Override
    public User createUser(User user) throws BadDataException {

        LOGGER.info("create new customer");

        // new user(customer)
        User newUser = new User();

        // if email already existed then inform to user "Email already exists.
        // Please choose another email."
        if (existEmail(user.getEmail())) {

            LOGGER.info("Email already exists. Please choose another email.");

            throw new BadDataException(EMAIL_ALREADY_EXISTS);
        }

        // set email
        newUser.setEmail(user.getEmail());

        // set password
        newUser.setPassword(encodePassword(user.getPassword()));

        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPhone(user.getPhone());
        newUser.setShippingAddress(user.getShippingAddress());

        // default role = ROLE_CUSTOMER
        newUser.setRole("ROLE_CUSTOMER");
        // customer status = "Active" always
        newUser.setStatus("Active");

        // save new user into database
        userRepository.save(newUser);

        return newUser;
    }

    // update user profile
    @Override
    public User updateProfile(EditProfile editProfile) throws EntityNotFoundException {

        LOGGER.info("Update profile");

        // get existing user(persistent)
        User existingUser = userRepository.findById(editProfile.getId())
                .orElseThrow(() -> new EntityNotFoundException(NO_USER_FOUND_BY_ID + editProfile.getId()));

        // set new values to existing user
        existingUser.setFirstName(editProfile.getFirstName());
        existingUser.setLastName(editProfile.getLastName());
        existingUser.setPhone(editProfile.getPhone());
        existingUser.setShippingAddress(editProfile.getShippingAddress());

        // update existing user(persistent)
        userRepository.save(existingUser);

        return existingUser;
    }

    // check whether an email already existed or not?
    // return:
    //  - true: email already existed in the database
    //  - false: email has not yet existed in the database
    private boolean existEmail(String email) {

        User user = findUserByEmail(email);

        return (user != null);
    }

    // encode password
    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

}
