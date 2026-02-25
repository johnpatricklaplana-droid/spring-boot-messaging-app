package com.example.demo.Exceptions;

public class MessageNotFoundException extends RuntimeException {
    
    public MessageNotFoundException(String errorMessage) {
        super(errorMessage);
    }

}
