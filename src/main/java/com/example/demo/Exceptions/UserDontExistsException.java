package com.example.demo.Exceptions;

public class UserDontExistsException extends RuntimeException {
    
    public UserDontExistsException(String message) {
        super(message);
    }
}
