package com.ez.marketplacebackend.exception;

// this class is used when request data is invalid
public class BadDataException extends Exception {

    public BadDataException(String message) {
        super(message);
    }

}
